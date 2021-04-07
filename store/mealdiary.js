import Axios from "axios";
import { DOMAIN_URL } from "../constants/domain";
//ACTION TYPE
const GET_DISHESBYDATE = "GET_DISHESBYDATE";

const GET_NUTRITION_INFO = "GET_NUTRITION_INFO";

const DEPOSIT_DISH_INFO = "DEPOSIT_DISH_INFO";

const GET_WORKOUT_DEBT = "GET_WORKOUT_DEBT";

//ACTION CREATOR
const getDishesByDate = (dishes) => {
  return {
    type: GET_DISHESBYDATE,
    dishes,
  };
};

const getNutritionInfo = (dishObj) => {
  return {
    type: GET_NUTRITION_INFO,
    dishObj,
  };
};

export const depositDishInfo = (dish) => {
  return {
    type: DEPOSIT_DISH_INFO,
    dish,
  };
};

const gotWorkoutDebt = (workoutDebt) => {
  return {
    type: GET_WORKOUT_DEBT,
    workoutDebt,
  };
};

//THUNK
export const fetchDishes = (date) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(
        // `https://daily-dose-server.herokuapp.com/api/userDish/${date}`
        //`http://${DOMAIN_URL}/api/userDish/${date}`
         `https://nameless-badlands-31111.herokuapp.com/api/userDish/${date}`
      );
      dispatch(getDishesByDate(data));
    } catch (error) {
      console.error(error);
    }
  };
};

export const fetchIngreInfo = (dishId) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.get(
        // `https://daily-dose-server.herokuapp.com/api/userDish/dishIngredient/${dishId}`
        //`http://${DOMAIN_URL}/api/userDish/dishIngredient/${dishId}`
        `https://nameless-badlands-31111.herokuapp.com/api/userDish/dishIngredient/${dishId}`
      );
      const ingreArr = data[0].dish.ingredients;
      dispatch(getNutritionInfo(ingreArr));
    } catch (error) {
      console.error(error);
    }
  };
};

export const removeDish = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await Axios.delete(
        //`https://daily-dose-server.herokuapp.com/api/userDish/${id}`
        //`http://${DOMAIN_URL}/api/userDish/${id}`
        `https://nameless-badlands-31111.herokuapp.com/api/userDish/${id}`
      );
      return await dispatch(fetchDishes(data.date));
    } catch (error) {
      console.error(error);
    }
  };
};

export const getPreviousDayValues = (incomingDate) => {
  return async (dispatch) => {
    try {
      const yesterday = new Date(incomingDate);
      yesterday.setDate(incomingDate.getDate() - 1);
      const { data } = await Axios.get(
        //`http://${DOMAIN_URL}/api/workoutDebt/${yesterday}`
        `https://nameless-badlands-31111.herokuapp.com/api/workoutDebt/${yesterday}`
      );
      return await dispatch(gotWorkoutDebt(data));
    } catch (error) {
      console.error(error);
    }
  };
};
//INITIAL STATE
const initialState = {
  ingreArrayInfo: [],
  dishInfo: {},
  dishByDate: [],
  breakfast: [],
  lunch: [],
  dinner: [],
  snack: [],
  workoutDebtInfo: { calorieCount: {}, workoutCalculations: { workouts: [] } },
};

//REDUCER
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DISHESBYDATE:
      let clonedState = { ...state };
      let dishes = action.dishes;
      let breakfastcloned = dishes.filter((obj) => {
        if (obj.mealType === "Breakfast") {
          return true;
        } else {
          return false;
        }
      });
      let lunchcloned = dishes.filter((obj) => {
        if (obj.mealType === "Lunch") {
          return true;
        } else {
          return false;
        }
      });
      let dinnercloned = dishes.filter((obj) => {
        if (obj.mealType === "Dinner") {
          return true;
        } else {
          return false;
        }
      });
      let snackcloned = dishes.filter((obj) => {
        if (obj.mealType === "Snack") {
          return true;
        } else {
          return false;
        }
      });
      clonedState.breakfast = breakfastcloned;
      clonedState.lunch = lunchcloned;
      clonedState.dinner = dinnercloned;
      clonedState.snack = snackcloned;
      clonedState.dishByDate = action.dishes;
      return clonedState;
    case GET_NUTRITION_INFO:
      let stateClone = { ...state };
      stateClone.ingreArrayInfo = action.dishObj;
      return stateClone;
    case DEPOSIT_DISH_INFO:
      let copystateClone = { ...state };
      copystateClone.dishInfo = action.dish;
      return copystateClone;
    case GET_WORKOUT_DEBT:
      let clone = { ...state };
      clone.workoutDebtInfo = {
        ...clone.workoutDebtInfo,
        ...action.workoutDebt,
      };
      return clone;
    default:
      return state;
  }
};
export default reducer;
