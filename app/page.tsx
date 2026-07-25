'use client';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import products from "./data/products.json";
import ProductCard from "./components/ProductCard";

// Definimos las estructuras de datos (Typescript)
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  urlImage: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function Home() {
  // --- ESTADOS DE LA APLICACIÓN ---
  const [categoryFilter, setCategoryFilter] = useState<string>('Todas');
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Estados para el Login
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // --- EFECTOS (Persistencia en LocalStorage) ---
  useEffect(() => {
    // Cargar sesión y carrito al montar la página
    const authStatus = localStorage.getItem('isLoggedIn');
    if (authStatus === 'true') {
      setIsLoggedIn(true);
    }
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    // Guardar carrito en localStorage cada vez que cambie
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);


  // --- LÓGICA DE AUTENTICACIÓN ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || password.length < 4) {
      Swal.fire({
        icon: 'error',
        title: 'Error de validación',
        text: 'Por favor, ingresa un correo válido y una contraseña de al menos 4 caracteres.',
      });
      return;
    }
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    setIsLoggedIn(true);
    Swal.fire({
      icon: 'success',
      title: '¡Bienvenido!',
      text: 'Sesión iniciada correctamente.',
      timer: 1500,
      showConfirmButton: false
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setCart([]);
  };


  // --- LÓGICA DEL CARRITO DE COMPRAS ---
  const handleAddToCart = (product: Product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        return prevCart.map((item) => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    Swal.fire({
      title: '¡Añadido!',
      text: `${product.title} se agregó al carrito.`,
      icon: 'success',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000
    });
  };

  const updateQuantity = (id: number, amount: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  const handleRemoveFromCart = (id: number) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Vas a eliminar este producto de tu carrito",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
        Swal.fire('¡Eliminado!', 'El producto fue removido.', 'success');
      }
    });
  };


  // --- FILTRADO DE PRODUCTOS ---
  const filteredProducts = categoryFilter === 'Todas' 
    ? products 
    : products.filter((p: any) => p.category === categoryFilter);

  const categories = ['Todas', ...Array.from(new Set(products.map((p: any) => p.category)))];

  // --- INTERFAZ GRÁFICA ---
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      {!isLoggedIn ? (
        /* VISTA 1: FORMULARIO DE INICIO DE SESIÓN */
        <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-lg shadow-md border">
          <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Iniciar Sesión</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                placeholder="usuario@correo.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                placeholder="••••••••"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Ingresar
            </button>
          </form>
        </div>
      ) : (
        /* VISTA 2: APLICACIÓN COMPLETA (TIENDA Y CARRITO) */
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
            <h1 className="text-3xl font-extrabold text-blue-600">Mi Tienda Online</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 font-semibold">Usuario: {email || localStorage.getItem('userEmail')}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </header>

          {/* SECCIÓN DE FILTROS POR CATEGORÍA */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-4 py-2 rounded-full font-medium text-sm transition-all ${
                  categoryFilter === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* CUADRÍCULA DE PRODUCTOS DEL CATÁLOGO */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Productos Disponibles ({filteredProducts.length})</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProducts.map((product: any) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={handleAddToCart} 
                  />
                ))}
              </div>
            </div>

            {/* BARRA LATERAL DEL CARRITO DE COMPRAS */}
            <div className="bg-white p-6 rounded-lg shadow-md h-fit border">
              <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Tu Carrito</h2>
              {cart.length === 0 ? (
                <p className="text-gray-500 text-sm">El carrito está vacío.</p>
              ) : (
                <div>
                  <div className="max-h-80 overflow-y-auto mb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-2 text-sm text-gray-800">
                        <div className="flex-1 pr-2">
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-gray-500">${item.price} x {item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="px-2 py-0.5 bg-gray-200 rounded font-bold">-</button>
                          <span className="px-2 font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="px-2 py-0.5 bg-gray-200 rounded font-bold">+</button>
                          <button onClick={() => handleRemoveFromCart(item.id)} className="ml-2 text-red-500 font-medium hover:text-red-700">X</button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-2 border-t">
                    <div className="flex justify-between font-bold text-lg text-gray-800 mb-4">
                      <span>Total:</span>
                      <span>${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                    </div>
                    <button 
                      onClick={() => Swal.fire('¡Compra exitosa!', 'Simulación de procesamiento e invoice.', 'success')}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                      Finalizar Compra
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}