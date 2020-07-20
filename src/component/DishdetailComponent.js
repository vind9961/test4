import React from 'react';
import {Modal, ModalBody, ModalHeader, Card, CardImg, CardText, CardBody,
	CardTitle, Breadcrumb, BreadcrumbItem, Button, Row, Label} from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Link} from 'react-router-dom';
import {Loading} from './loadingComponent';
import {baseUrl} from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

const RenderDish = ({dish}) => {
	return (
		<div className ='col-12 col-md-5 m-1'>
		<FadeTransform
							 in
							 transformProps={{
									 exitTransform: 'scale(0.5) translateY(-50%)'
							 }}>
		   <Card key={dish.id}>
		      <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name} />
		      <CardBody>
		          <CardTitle>{dish.name}</CardTitle>
		          <CardText>{dish.description}</CardText>
		      </CardBody>
		    </Card>
				</FadeTransform>
		</div>
		);
}

class CommentForm extends React.Component{
	constructor(props){
		super(props);
		this.state={
			isModalOpen: false
		};
		this.toogleModal = this.toogleModal.bind(this);
		this.CommentSubmit = this.CommentSubmit.bind(this);
	}

	toogleModal(){
		this.setState({isModalOpen: !this.state.isModalOpen});
	}



	CommentSubmit(values){
		this.toogleModal();
		this.props.postComment(this.props.dishId, values.rating, values.name, values.comment);
	}

render(){
	return(
		<>
		<Button outline onClick={this.toogleModal}><span className="fa fa-pencil"></span> Submit Comment</Button>
		<Modal isOpen={this.state.isModalOpen} toggle={this.toogleModal}>
			<ModalHeader toggle={this.toogleModal}>Submit Comment</ModalHeader>
			<ModalBody>
				<LocalForm onSubmit={(values) => this.CommentSubmit(values)}>
					<Row className="form-group">
						<Label className="mx-3" htmlFor='rating'>Rating</Label> <br />
							<Control.select model=".rating" id='rating' name="rating" className="form-control mx-3">
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</Control.select>
					</Row>
					<Row className="form-group">
						<Label className="mx-3" htmlFor='name'>Your Name</Label>
						<Control.text model=".name" id='name' name='name' className="form-control mx-3" placeholder="Your Name"
						validators ={{ minLength: minLength(3), maxLength: maxLength(15) }}  />
						<Errors className="text-danger mx-3" model=".name" show="touched"
						messages={{
							minLength: 'Must be greater than 2 characters',
							maxLength: 'Must be 15 characters or less'
						}} />
					</Row>
					<Row className="form-group">
						<Label className='mx-3' htmlFor="comment">Comment</Label>
						<Control.textarea model=".comment" id='comment' name='commet' className="form-control mx-3" row='6' />
					</Row>
					<Row>
						<Button type="submit" className="bg-primary mx-3">Submit</Button>
					</Row>
				</LocalForm>
			</ModalBody>
		</Modal>
		</>
	);
	}
}

const RenderComment = ({comments, postComment, dishId}) =>{


	const comment = comments.map((comment) => {
		return(

				<Fade in>
		   <div key={comment.id}>
			    <p>{comment.comment}</p>
			    <p> -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'})
					.format(new Date(Date.parse(comment.date)))}</p>
		   </div>
			 	</Fade>

		);
	})

	return (
	<div className="col-12 col-md-5 m-1">
	<h4>Comments</h4>
	<Stagger in>
	{comment}
	</Stagger>
	<CommentForm dishId= {dishId} postComment={postComment} />
	</div>
	);
}


const DishDetail = (props) => {
	if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
	else if(props.dish != null){
      return (
       <div className="container">
       <div className="row">
         <Breadcrumb>
           <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
           <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
         </Breadcrumb>
         <div className="col-12">
           <h3>{props.dish.name}</h3>
           <hr />
         </div>
       </div>
        <div className="row">
	         <RenderDish dish = {props.dish} />
	         <RenderComment comments = {props.comments} postComment={props.postComment}
        dishId={props.dish.id}/>
         </div>
       </div>
        );
	}
	else
		return(<div></div>);
}


export default DishDetail;
