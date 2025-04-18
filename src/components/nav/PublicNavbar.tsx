const NavbarSimple = () => {
    return (
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                alt="Logo"
              />
              <span className="text-white font-semibold text-lg ml-2">
                Agendados
              </span>
            </div>
          </div>
        </div>
      </nav>
    );
  };
  
  export default NavbarSimple;
  