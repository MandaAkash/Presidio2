import React, { useState, useEffect } from 'react';
import '../manageProperty.css'

const ManageProperties = () => {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    place: '',
    area: 0,
    bedrooms: 0,
    bathrooms: 0,
  });
  const [updatingPropertyId, setUpdatingPropertyId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(6); // Number of properties to display per page

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const email = localStorage.getItem('email');
        const response = await fetch(`http://localhost:5000/properties/seller/${email}`);
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProperties();
  }, []);

  const deleteProperty = async (id) => {
    try {
      await fetch(`http://localhost:5000/properties/${id}`, { method: 'DELETE' });
      setProperties(properties.filter((property) => property._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProperty = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/properties/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const updatedProperty = await response.json();
        // Update the property in the properties state
        setProperties(properties.map(property => property._id === id ? updatedProperty : property));
        // Reset the updatingPropertyId state
        setUpdatingPropertyId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Logic to get current properties
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(indexOfFirstProperty, indexOfLastProperty);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {properties.length === 0 ? (
        <p>You haven't posted any property yet.</p>
      ) : (
        <div className="properties-container">
          {currentProperties.map((property) => (
            <div key={property._id} className="card">
              <img src='https://cdn.houseplansservices.com/content/nkfuvivsnfl7mb5eb4fm1ibi8v/w991x660.jpg?v=2' alt="#" />
              <h3>{property.place}</h3>
              <p>{property.area} sq.ft.</p>
              <p>{property.bedrooms} Bedrooms, {property.bathrooms} Bathrooms</p>
              <button onClick={() => deleteProperty(property._id)}>Delete</button>
              <button onClick={() => setUpdatingPropertyId(property._id)}>Update</button>
              {updatingPropertyId === property._id && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  updateProperty(property._id);
                }}>
                  <input type="text" placeholder="place" name="place" value={formData.place !== 0 ? formData.place : ''} onChange={handleInputChange} />
                  <input type="number" placeholder="area" name="area" value={formData.area !== 0 ? formData.area : ''} onChange={handleInputChange} />
                  <input type="number" name="bedrooms" placeholder="bedrooms" value={formData.bedrooms !== 0 ? formData.bedrooms : ''} onChange={handleInputChange} />
                  <input type="number" name="bathrooms" placeholder="bathrooms" value={formData.bathrooms !== 0 ? formData.bathrooms : ''} onChange={handleInputChange} />
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setUpdatingPropertyId(null)}>Cancel</button>
                </form>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="pagination">
        <button className="arrow" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>{'<'}</button>
        {Array.from({length: Math.ceil(properties.length / propertiesPerPage)}, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)}>{i + 1}</button>
        ))}
        <button className="arrow" onClick={() => paginate(currentPage + 1)} disabled={currentPage === Math.ceil(properties.length / propertiesPerPage)}>{'>'}</button>
      </div>
    </div>
  );
};

export default ManageProperties;
