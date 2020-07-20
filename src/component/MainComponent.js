import React from 'react';
import Header from './HeaderComponent';
import Menu from './menuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetail from './DishdetailComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, postFeedback, fetchDishes, fetchPromos, fetchComments, fetchLeaders } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';

const mapDispatchToProps = dispatch => ({

   postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
   fetchDishes: ()=> {dispatch(fetchDishes())},
   fetchComments: ()=> {dispatch(fetchComments())},
   fetchPromos: ()=> {dispatch(fetchPromos())},
   fetchLeaders: ()=> {dispatch(fetchLeaders())},
   postFeedback: (value)=>dispatch(postFeedback(value)),
   resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}

 });


const mapStateToProps = state => {

  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
    feed: state.feed
  }
}


class Main extends React.Component {
  componentDidMount () {
         this.props.fetchDishes();
         this.props.fetchComments();
         this.props.fetchPromos();
         this.props.fetchLeaders();
  }


	render(){
		const HomePage = () => {
	      return(
	          <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
            dishesLoading={this.props.dishes.isLoading}
            dishesErrMess={this.props.dishes.errMess}
	          promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
            promoLoading={this.props.promotions.isLoading}
            promoErrMess={this.props.promotions.errMess}
	          leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
            leadersLoding={this.props.leaders.isLoading}
            leadersErrMess = {this.props.leaders.errMess}
             />
	      );
	    }
	    const DishWithId = ({match})=>{
	    	return(
	    		<DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
	    	comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment} />
	    		);

	    }
	    const AboutUs = () => {
	    	return(
	    		<About leaders={this.props.leaders.leaders} />
	    		);
	    };

		return (
			<div>
		        <Header />
		        <Switch>
	              <Route path='/home' component={HomePage} />
	              <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes.dishes}
                isLoading={this.props.dishes.isLoading} errMess={this.props.dishes.errMess}/>} />
	              <Route path='/menu/:dishId' component={DishWithId} />
	              <Route path='/aboutus' component={AboutUs} />
	              <Route path='/contactus' component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}
                 postFeedback={this.props.postFeedback}/>} />
	              <Redirect to="/home" />
	            </Switch>
		        <Footer />
			</div>
		);
	}
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
