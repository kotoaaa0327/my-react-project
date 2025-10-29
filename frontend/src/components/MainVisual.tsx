//メイン

const MainVisual : React.FC = () => {
  return (
    <section className="main-visual">
      <div className="relative">
        <img
          src="/images/StormVisual.png"
          alt="MainVisual"
          className="w-full h-auto"
        />
        <img
          src="/images/Stormlogo.png"
          alt="Logo"
          className="absolute top left-1/2 top-2/3 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </section>
  );
};

export default MainVisual;
