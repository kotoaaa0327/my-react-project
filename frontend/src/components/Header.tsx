//ヘッダー

const Header = () => {
  const scrollToSchedule = () => {
    document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToTicket = () => {
    document.getElementById("ticket")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToGoods = () => {
    document.getElementById("goods")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToFanclub = () => {
    document.getElementById("fanclub")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToRequest = () => {
    document.getElementById("request")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className=" absolute top-0 left-0 w-full z-50 flex justify-between items-start p-2 md:p-4 lg:p-5 text-white font-display tracking-wider">
      <h1 className="text-4xl md:text-6xl font-bold text-white ">Storm</h1>
      <div className ="header-button">
      <button  onClick={scrollToSchedule}>SCHEDULE</button>
      <button onClick={scrollToTicket}>TICKET</button>
      <button onClick={scrollToGoods}>GOODS</button>
      <button onClick={scrollToFanclub}>FAN CLUB</button>
      <button onClick={scrollToRequest}>REQUEST</button>
      </div>
    </header>
  );
};

export default Header;
