import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';

export const fetchDishes = ()=> dispatch =>{
  dispatch(dishesLoading(true));


    return fetch(baseUrl + 'dishes')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {

        var errmess = new Error(error.message);
        throw errmess;
      })
    .then(response => response.json())
    .then(data => dispatch(addDishes(data)))
    .catch(error => dispatch(dishesFailed(error.message)));;

}

export const dishesLoading = () =>({
    type: ActionTypes.DISHES_LOADING

});

export const addDishes = (dishes)=>({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});

export const dishesFailed = (errMess)=>({
  type: ActionTypes.DISHES_FAILED,
  payload: errMess
});



export const fetchComments = () => dispatch =>{
  return fetch(baseUrl+'comments')
  .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {

        var errmess = new Error(error.message);
        throw errmess;
      })
  .then(response => response.json())
  .then(data => dispatch(addComments(data)))
  .catch(error => dispatch(commentsFailed(error.message)));;
}

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});

export const postComment = (dishId, rating, author, comment) => dispatch => {
  var newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment
  };
  newComment.date = new Date().toISOString();

  return fetch(baseUrl+"comments", {
                          method: "POST",
                          body: JSON.stringify(newComment),
                          headers: {
                                "Content-Type": "application/json"
                              },
                          credentials: "same-origin"
                        })
  .then(response => {
    if(response.ok)
      return response;

    else {
      var error = new Error ('Error' + response.status + ':' + response.statusText);
      error.response=response;
      throw error;
    }
  }, error => {throw error;})
  .then(response => response.json())
  .then(data => {
  dispatch(addComment(data))
  })
  .catch(error =>{
    console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message);
  });
};

export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const commentsFailed = (errMess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMess
});



export const fetchPromos = () => dispatch => {
  dispatch(promosLoading(true));

  return fetch(baseUrl+'promotions')
  .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {

        var errmess = new Error(error.message);
        throw errmess;
      })
  .then(response => response.json())
  .then(data => dispatch(addPromos(data)))
  .catch(error => dispatch(promosFailed(error.message)));;
}

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING
});

export const promosFailed = (errMess) =>({
  type: ActionTypes.PROMOS_FAILED,
  payload: errMess
});



export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});

export const leadersFailed = (errMess) =>({
  type: ActionTypes.LEADERS_FAILED,
  payload: errMess
});

export const leadersLoading = () =>({
  type: ActionTypes.LEADERS_LOADING
});

export const fetchLeaders = () => dispatch => {
  dispatch(leadersLoading(true));

  return fetch(baseUrl + 'leaders')
  .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {

        var errmess = new Error(error.message);
        throw errmess;
      })
  .then(response => response.json())
  .then(data => dispatch(addLeaders(data)))
  .catch(error => dispatch(leadersFailed(error.message)));;
}


export const postFeedback = (value) => dispatch => {
  return(
    fetch(baseUrl+'feedback', {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
            "Content-Type": "application/json"
          },
      credentials: "same-origin"
    })
    .then(response =>{
    if(response.ok)
      return response;
    else{
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  }, error => {throw error;})
    .then(data => dispatch(addFeedback(value)))
    .catch(error => console.log("error" + error))
  );
}

export const addFeedback = (value) => ({
  type: ActionTypes.ADD_FEEDBACK,
  payload: value
});
