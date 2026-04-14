export default function Main() {
const balance = 1234.56;
const formattedBalance = balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
  return (
    <div className="home">
        <h2 className="home__title">Olá, -nome de usuario-!</h2>
        <h3 className="home__balance-title" >Saldo atual:</h3>
      <h3 className="home__balance">{formattedBalance}</h3>
    </div>
  );
}
