import React, { useState, useEffect } from 'react';
import '../buyer.css'; 

const Buyer = () => {
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(6); // Number of properties to display per page
  const [interested, setInterested] = useState(false);
  const [details, setDetails] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('https://presidio2.onrender.com/properties');
        const data = await response.json();
        setFilteredProperties(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProperties();
  }, []);

  // Logic to get current properties
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleInterestClick = async (propertyId) => {
    try {
      const response = await fetch(`https://presidio2.onrender.com/properties/${propertyId}/seller`);
      const sellerDetails = await response.json();
      setInterested(true);
      setDetails(sellerDetails[0]);
      setSelectedProperty(propertyId);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="buyer-container">
      <div className="properties-grid">
        {currentProperties.map((property) => (
          <div key={property._id} className="property-card-container">
            <div className="property-card">
              <img src="https://cdn.houseplansservices.com/content/nkfuvivsnfl7mb5eb4fm1ibi8v/w991x660.jpg?v=2" alt="Property" className="property-image"/>
              <h3>{property.place}</h3>
              <p>{property.area} sqft</p>
              <p>{property.bedrooms} Bedrooms</p>
              <p>{property.bathrooms} Bathrooms</p>
              <button onClick={() => handleInterestClick(property._id)} className="interest-button">I'm Interested</button>
              {interested && property._id === selectedProperty && (
                <div className="details-container">
                  <h4>Seller Details:</h4>
                  <div>
                    <p>Name: {details.seller}</p>
                    <p>Email: {details.email}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>
        {Array.from({length: Math.ceil(filteredProperties.length / propertiesPerPage)}, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>{i + 1}</button>
        ))}
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(filteredProperties.length / propertiesPerPage)}>{'>'}</button>
      </div>
    </div>
  );
};

export default Buyer;
