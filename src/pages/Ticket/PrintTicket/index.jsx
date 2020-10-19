import React from "react";

import "./style.css";

class PrintTicket extends React.Component {
  state = {
    ticket: this.props.ticket,
  };
  companyName = "EzBet";

  componentDidUpdate = (prevProps, prevState) => {
    console.log("update", this.state.ticket);
    if (this.props.ticket && prevProps.ticket !== this.props.ticket) {
      this.setState({ ticket: this.props.ticket });
    }
  };

  calculateReturns = () => {
    const { stake, totalOdds, vatValue } = this.state.ticket;
    return stake * totalOdds - vatValue;
  };

  render() {
    if (!this.state.ticket || !this.state.ticket.bets) {
      return "Loading";
    }
    const { placementID, bets, stake, vatValue } = this.state.ticket;
    return (
      <div className="ticket-container">
        <div className="ticket-item">
          <h1 className="ticket-item_header">{this.companyName}</h1>
          <p className="ticket-item_id">Placement ID : {placementID}</p>
          <p className="ticket-item_date">
            Date : {new Date().toLocaleDateString("en-GB")}
          </p>
          {bets.map((bet) => (
            <article key={bet._id} className="ticket-item_bet">
              <p className="ticket-item_bet_name">{bet.fixtureName}</p>
              <span className="ticket-item_bet_details">{bet.type}</span>
              <span className="ticket-item_bet_details">{bet.value}</span>
              <span className="ticket-item_bet_details">{bet.oddValue}</span>
              <hr />
            </article>
          ))}
          <div className="ticket-item_summary">
            <p>Bet Amt : {stake}</p>
            <p>Vat(15%) : {vatValue}</p>
            <p>Est Return : {this.calculateReturns()}</p>
          </div>
          <hr />
          <div className="ticket-item_terms">
            Terms and conditions apply as set by {this.companyName}
          </div>
        </div>
      </div>
    );
  }
}
export default PrintTicket;
