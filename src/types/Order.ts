interface Order {
  id: string
  user_id: string
  payment_date: string
  payment_method: string
  total_amount: number | string
}
export default Order;
