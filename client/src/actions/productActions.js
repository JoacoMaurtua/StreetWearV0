import {PRODUCT_LIST_REQUEST,PRODUCT_LIST_SUCCESS,PRODUCT_LIST_FAIL} from '../constants/productConstants';
import axios from 'axios';

//Funcion asincrona creadora de acciones
export const listProducts = () => async(dispatch) =>{
  try{
    dispatch({type: PRODUCT_LIST_REQUEST}) //dispatch() envia la accion al store

    const {data} = await axios.get('/api/products/list'); //se extrae los datos de la API productos

    dispatch({
      type: PRODUCT_LIST_SUCCESS, //tipo de accion a realizar
      payload: data //array que contiene todos los objetos producto en la base de datos
    })

  }catch(error){
    dispatch({
      type:PRODUCT_LIST_FAIL,
      payload: error.response && error.response.data.message? //mismo error que apareceria en mongoDB atlas
      error.response.data.message
      :error.message
    })
  }
}