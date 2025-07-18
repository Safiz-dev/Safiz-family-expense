import { useState, useEffect } from 'react';
import { db } from '../utils/firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'expenses'), snapshot => {
      setExpenses(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'expenses'), {
      name, amount, location, date
    });
    setName(''); setAmount(''); setLocation(''); setDate('');
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>👨‍👩‍👧‍👦 Safiz Family Expense Tracker</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required /><br />
        <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} required /><br />
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required /><br />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required /><br />
        <button type="submit">Add Expense</button>
      </form>
      <ul>
        {expenses.map(exp => (
          <li key={exp.id}>
            {exp.date} - {exp.name} spent ৳{exp.amount} at {exp.location}
          </li>
        ))}
      </ul>
    </main>
  );
}