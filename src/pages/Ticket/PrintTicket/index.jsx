import React from 'react'

import './style.css' 
import __UnixTimeConverter from '../../../utils/unixTimeConverter'
// <{ticket: any}>
class PrintTicket extends React.Component{

    ticket = this.props.ticket
    companyName="EzBet"
    calculateReturns = () => {
        return (this.ticket.stake * this.ticket.totalOdds) - this.ticket.vatValue
    }
    render(){
        console.log('props',this.props)
        return (
            <div className="ticket-container" onClick={window.print}>
                <div className='ticket-item'>
                    <h1 className="ticket-item_header">{this.companyName}</h1>
                    <p className="ticket-item_id">Ticket ID : {this.ticket.ticketID}</p>
                    <p className="ticket-item_date">Date : {new Date().toLocaleDateString('en-GB')}</p>
                    {this.ticket.bets.map( bet => (
                        <article key={bet._id} className="ticket-item_bet">
                            <p className="ticket-item_bet_name">{bet.fixtureName}</p>
                            <span className="ticket-item_bet_details">{bet.type}</span>
                            <span className="ticket-item_bet_details">{bet.value}</span>
                            <span className="ticket-item_bet_details">{bet.oddValue}</span>
                            <hr/>
                        </article>
                    ))}
                    <div className="ticket-item_summary">
                            <p>Bet Amt : {this.ticket.stake}</p>
                            <p>Vat(15%) : {this.ticket.vatValue}</p>
                            <p>Est Return : {this.calculateReturns()}</p>
                    </div>
                    <hr/>
                    <div className="ticket-item_terms">Terms and conditions apply as set by {this.companyName}</div>
                </div>
            </div>
    )
    }
}
export default PrintTicket