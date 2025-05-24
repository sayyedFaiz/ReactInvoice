import { StyleSheet } from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 10,
  },
  invoiceContainer: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-between",
    height: "100%",
    width: "100%",
  },
  headerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",
  },
  companyTitle: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    letterSpacing: 1,
  },
  companyContactDetails: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    textAlign: "center",
    alignContent: "center",
    width: "100%",
    fontSize: 12,
    marginBottom: 10,
    marginTop: 5,
  },
  invoiceTag: {
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 5,
    textTransform: "uppercase"
  },
  customerDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
  },
  customerDetails: {
    display: "flex",
    flexDirection: "column",
    fontSize: 10,
    // maxWidth: "50%",
    width: "60%",

  },
  dateInvoiceContainer: {
    display: "flex",
    flexDirection: "column",
  },

  table: {
    display: "table",
    width: "auto",
    marginTop:10,
    // borderCollapse: "collapse",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderColor: "gray",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    padding: 5,
    fontSize: 10,
    textAlign:"left",
    textTransform: "capitalize"
  },
  tableHeader:{
    padding: 5,
    fontSize: 10,
    textAlign:"center",
    fontWeight: "bold",
    color:"#fff",
    backgroundColor: "#000",
    textTransform: "capitalize"
  },
  text: {
    fontSize: 12,
    letterSpacing: 0.5,
  },
  label: {
    fontWeight: "bold",
    fontSize: 12,
  },
});

export default styles;
