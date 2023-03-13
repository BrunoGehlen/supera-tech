from django.core.management.base import BaseCommand, CommandError
from kafka import KafkaProducer, KafkaConsumer
#from polls.models import Question as Poll

from json import dumps

class Command(BaseCommand):
    help = ''

    def read_messages(self, topic):
        consumer = KafkaConsumer(
                topic,
                bootstrap_servers='localhost:9092',
                api_version=(0,11,5)
            )
        for message in consumer:
            yield message.value.decode()

    def handle(self, *args, **options):
        for message in self.read_messages('orders'):
            self.stdout.write(self.style.SUCCESS(f'Reading Order: {message}'))
