import React from 'react';
import { Card, CardImg, CardImgOverlay, CardTitle,
Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Loading} from './loadingComponent';
import {Link} from 'react-router-dom';
import {baseUrl} from '../shared/baseUrl';


const RenderMenuItem =  ({dish}) => {
	return(
		<Link to={`/menu/${dish.id}`}>
		<Card key={dish.id}>
	      <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
	      <CardImgOverlay>
	          <CardTitle>{dish.name}</CardTitle>
	      </CardImgOverlay>
	    </Card>
	    </Link>
		);


}


const Menu = (props) => {
	console.log(props);
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
											<div className="col-12">
													<h4>{props.errMess}</h4>
											</div>
									</div>
							</div>
					);
			}
			else{
				const menu = props.dishes.map((dish) => {
					return (
					<div  className="col-12 col-md-5 m-1">
			            <RenderMenuItem dish = {dish} onClick = {props.onClick} />
			        </div>
			        );
	});

	return (
			<div className="container">
			    <div className="row">
			      <Breadcrumb>
			        <BreadcrumbItem><Link to='/home'>Home</Link></BreadcrumbItem>
			        <BreadcrumbItem acitve>Menu</BreadcrumbItem>
			      </Breadcrumb>
			      <div className='col-12'>
			        <h4>Menu</h4>
			        <hr />
			      </div>
			    </div>
			    <div className="row">
			      {menu}
			    </div>
			</div>
	    );

}
}













export default Menu;
