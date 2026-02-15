import React from 'react';

const ServiceDetailsPage = async ({params}) => {
    
    const {id} = await params
    console.log(id);
    

    return (
        <div>
           Service Details Page {id} 
        </div>
    );
};

export default ServiceDetailsPage;