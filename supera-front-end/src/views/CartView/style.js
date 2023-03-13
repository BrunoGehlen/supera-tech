import styled from "styled-components"

export const View = styled.div`
    width: 400px;
    max-height: 330px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    color: black;
    border: 2px solid black;
    *::-webkit-scrollbar,
    *::-webkit-scrollbar-thumb {
        width: 26px;
        border-radius: 13px;
        background-clip: padding-box;
        border: 10px solid transparent;
    }

    *::-webkit-scrollbar-thumb {        
        box-shadow: inset 0 0 0 10px;
    }
    `

export const CartDetailView = styled.div`
    display: flex;
    align-items: center;
    padding: 8px;
    bottom: 0px;
    color: black;
    position: relative;
    
    > div {
        flex-grow: 4;
    }
`

export const ProductListView = styled.div`
    overflow-y: auto;
`

export const ProductView = styled.div`
    display: flex;
    max-height: 100px;
    color: black;
    
    padding: 5px;
    flex-wrap: wrap;
    align-items: center;
    
    border-bottom: 1px solid transparent;
    border-image: linear-gradient(0.25turn, #fff, #000, #fff);
    border-image-slice: 1;

    

`

export const ImageView = styled.img`
    width: 64px;
    height: 64px;
`

export const ButtomView = styled.button`
    width: 80px;
    height: 42px;

    appearance: none;
    background-color: #000000;
    border: 2px solid #1A1A1A;
    border-radius: 5px;
    box-sizing: border-box;
    color: #FFFFFF;
    cursor: pointer;
    display: inline-block;
    font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
    font-size: 16px;
    font-weight: 400;
    line-height: normal;
    margin: 0;
    min-width: 0;
    outline: none;
    text-align: center;
    text-decoration: none;
    transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    width: 84px;
    will-change: transform;

    &:disabled {
      pointer-events: none;
    }

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
      transform: translateY(-2px);
    }

    &:active {
      box-shadow: none;
      transform: translateY(0);
    }

`

export const ProductDetailView = styled.div`
    flex-grow: 4;
`

export const ProductTitleView = styled.p`
    font-size: 14px;
    padding: 4px;
`

export const ProductPriceView = styled.p`
    font-size: 12px;
    padding: 4px;
`

