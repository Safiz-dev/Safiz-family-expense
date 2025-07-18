import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: '', amount: '' });

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'expenses'));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setExpenses(data);
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'expenses'), newExpense);
    setNewExpense({ name: '', amount: '' });
    const querySnapshot = await getDocs(collection(db, 'expenses'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setExpenses(data);
  };

  return (
    <div>
      <h1>Safiz Family Expense Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Expense Name"
          value={newExpense.name}
          onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          required
        />
        <button type="submit">Add Expense</button>
      </form>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.name} - ৳{expense.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}
