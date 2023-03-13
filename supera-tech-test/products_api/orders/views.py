from orders.models import Orders, PurchasedProduct
from orders.serializers import OrderSerializer
from cart.models import Cart
from cart.serializers import CheckoutSerializer

from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action


class OrdersView(viewsets.ModelViewSet):
    queryset = Orders.objects.all()
    serializer_class = OrderSerializer
    authentication_classes = [TokenAuthentication]

    @action(detail=False, methods=['post'])
    def checkout(self, request, pk=None):
        cart = Cart.objects.get_or_create(owner=request.user.id)[0]
        serializer = CheckoutSerializer(instance=cart, context={'request': request})

        if products := cart.products.all():
            order = Orders.objects.create(owner=request.user)
            for product in products:
                purchased_product = PurchasedProduct.objects.create(
                    name=product.name,
                    price=product.price,
                    score=product.score,
                    sold_on_order=order
                )
                purchased_product.save()

            headers = self.get_success_headers(serializer.data)
            response = Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
            
            cart.products.clear()
            cart.save()

            return response
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
