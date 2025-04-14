export default function LandingPage() {
    return (
        <div>
            {/* Navbar */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-green-700">Agendalo</div>
                    <div className="space-x-4">
                        <a href="/login" className="text-gray-700 hover:text-green-700">Iniciar sesión</a>
                        <a
                            href="/register"
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            Prueba gratis
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero */}
            <section
                className="relative h-[80vh] flex items-center justify-center text-center text-white"
                style={{
                    backgroundImage: "url('/images/main.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                {/* Superposición oscura */}
                <div className="absolute inset-0 bg-black opacity-60" />

                {/* Contenido */}
                <div className="relative z-10 max-w-2xl px-4">
                    <h1 className="text-4xl font-bold sm:text-5xl">
                        Organiza tus citas con facilidad
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl">
                        Agendalo te ayuda a manejar tus reservas y clientes de forma simple y eficiente.
                    </p>
                    <div className="mt-6">
                        <a
                            href="#"
                            className="inline-block rounded-md bg-white px-6 py-3 text-gray-800 font-semibold hover:bg-gray-100 transition"
                        >
                            Comenzar prueba gratis
                        </a>
                    </div>
                </div>
            </section>
            {/* Features */}
            <section className="py-16 bg-white">
                <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-2 text-green-700">Reservas en línea</h3>
                        <p className="text-gray-600">Tus clientes pueden agendar citas desde su celular fácilmente.</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-2 text-green-700">Agenda organizada</h3>
                        <p className="text-gray-600">Visualiza tu día, semana o mes con nuestro calendario interactivo.</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-xl font-semibold mb-2 text-green-700">Recordatorios automáticos</h3>
                        <p className="text-gray-600">Envía notificaciones a tus clientes y evita citas perdidas.</p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-100 py-6 text-center text-gray-500">
                © {new Date().getFullYear()} Agendalo - Todos los derechos reservados.
            </footer>
        </div>
    );
}
