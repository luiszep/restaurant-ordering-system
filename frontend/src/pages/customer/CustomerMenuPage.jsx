import React, { useState, useEffect } from 'react';
import CartFloatingButton from './components/CartFloatingButton';
import ItemDetailModal from './components/ItemDetailModal';

const CustomerMenuPage = () => {

  const [menuSections, setMenuSections] = useState({});
  const [sectionOrder, setSectionOrder] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('customerCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });  

  useEffect(() => {
    const savedSections = localStorage.getItem('menuSections');
    const savedOrder = localStorage.getItem('sectionOrder');
  
    if (savedSections && savedOrder) {
      setMenuSections(JSON.parse(savedSections));
      setSectionOrder(JSON.parse(savedOrder));
    }
  }, []);  

  const handleAddToCart = (item) => {
    const cartItem = {
      name: item.name,
      price: item.price,
      quantity: 1, // Default quantity for now
    };
  
    const updatedCart = [...cart, cartItem];
    setCart(updatedCart);
    localStorage.setItem('customerCart', JSON.stringify(updatedCart));
    setSelectedItem(null); // Close modal after adding
  };  

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="p-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-center">Welcome to [Restaurant Name]</h1>
        <p className="text-center text-sm text-gray-600 mt-1">Browse the menu and place your order</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 space-y-6">
        {sectionOrder.map((sectionKey) => {
          const section = menuSections[sectionKey];
          if (!section) return null;

          return (
            <div key={sectionKey} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold mb-3">{section.title}</h2>
              
              <div className="space-y-3">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg flex justify-between items-center cursor-pointer hover:bg-gray-100 transition"
                    onClick={() => setSelectedItem(item)}
                  >

                    <div className="flex flex-col">
                      <span className="font-semibold text-lg">{item.name}</span>
                      {item.description && (
                        <span className="text-sm text-gray-500">{item.description}</span>
                      )}
                    </div>
                    <div className="text-lg font-bold">${item.price}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </main>

      {/* Floating Cart Button */}
      <CartFloatingButton cartItemCount={cart.length} />
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default CustomerMenuPage;
