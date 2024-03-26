import { useState } from "react";
import { MEALS_DATA } from './data';
import Meals from "./components/Meals/Meals";
import CartContext from "./store/cart-context";
import Cart from "./components/Cart/Cart";
import FilterMeals from "./components/FilterMeals/FilterMeals";

const App = () => {
    // 创建一个state用来存储食物列表
    const [mealsData, setMealsData] = useState(MEALS_DATA);

    
    // 创建一个过滤meals的函数
    const filterHandler = (keyword) => {
        const newMealsData = MEALS_DATA.filter(item => item.title.indexOf(keyword) !== -1);
        setMealsData(newMealsData);
    };
    // 创建一个state，用来存储购物车的数据
    /*
    *   1.商品 [] items
    *   2.商品总数（totalAmount）
    *   3.商品总价（totalPrice）
    * */
    const [cartData, setCartData] = useState({
        items: [],
        totalAmount: 0,
        totalPrice: 0
    });
    // 向购物车中添加商品
    const addItem = (meal) => {
        // meal 要添加进购物车的商品
        // 对购物车进行复制
        const newCart = { ...cartData };

        // 判断购物车中是否存在该商品
        if (newCart.items.indexOf(meal) === -1) {
            // 将meal添加到购物车中
            newCart.items.push(meal);
            // 修改商品的数量
            meal.amount = 1;
        } else {
            // 增加商品的数量
            meal.amount += 1;
        }

        // 增加总数
        newCart.totalAmount += 1;
        // 增加总金额
        newCart.totalPrice += meal.price;

        // 重新设置购物车
        setCartData(newCart);
    };
    //减少商品的数量
    const removeItem = (meal) => {
        // 复制购物车
        const newCart = { ...cartData };

        // 减少商品的数量
        meal.amount -= 1;

        // 检查商品数量是否归0
        if (meal.amount === 0) {
            // 从购物车中移除商品
            newCart.items.splice(newCart.items.indexOf(meal), 1);
        }

        // 修改商品总数和总金额
        newCart.totalAmount -= 1;
        newCart.totalPrice -= meal.price;

        setCartData(newCart);
    };

    const clearCart = () => {

        const newCart = { ...cartData };
        // 将购物车中商品的数量清0
        newCart.items.forEach(item => delete item.amount);
        newCart.items = [];
        newCart.totalAmount = 0;
        newCart.totalPrice = 0;

        setCartData(newCart);
    };


    return <CartContext.Provider value={{ ...cartData, addItem, removeItem, clearCart }}>
        <div>
            <FilterMeals onFilter={filterHandler} />
            <Meals mealsData={mealsData}></Meals>
            <Cart/>
        </div>
    </CartContext.Provider>
};

// 导出App
export default App;
