import React from "react";
import { useQuery } from "@apollo/react-hooks";
import DashboardView from "./DashboardView";
import { USERS } from "../../shared/graphql/user.gql";
import { TICKETS } from "../../shared/graphql/ticket.gql";
import { FullPageLoader } from "../../components/Loaders/FullPageLoader";

export const Dashboard = () => {
  const {
    loading: loadingCustomers,
    error: customersError,
    data: customersData,
  } = useQuery(USERS, { variables: { role: "CUSTOMER" } });

  const {
    loading: loadingTickets,
    data: ticketsData,
    error: ticketsError,
  } = useQuery(TICKETS);

  if (loadingCustomers || loadingTickets) {
    return <FullPageLoader />;
  }
  if (customersError || ticketsError) {
    return <h4>Error</h4>;
  }
  console.log("tickets", ticketsData);
  console.log("users", customersData);

  const getTotalTicketCount = (total: number, currentVal: any) => {
    return total + currentVal.bets.length;
  };
  const TOTAL_BET_COUNT = {
    title: "Total Bets",
    count: ticketsData.tickets.reduce(getTotalTicketCount, 0),
  };
  const TOTAL_CUSTOMERS_COUNT = {
    title: "Users",
    count: customersData.users.length,
  };
  const boardCountData = [TOTAL_BET_COUNT, TOTAL_CUSTOMERS_COUNT];
  return <DashboardView boardCountData={boardCountData} />;
};
