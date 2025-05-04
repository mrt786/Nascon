import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputBox from '../Global Components/InputBox';
import SimpleButton from '../Global Components/SimpleButton';
import { getUserRole } from '../utils/auth';
import AnimatedForm from '../Animations/AnimatedForms';

const SubmitScoreForm = () => {
  const { eventId } = useParams();
  const [userId, setUserId] = useState('');
  const [teamName, setTeamName] = useState('');
  const [score, setScore] = useState('');
  const [round, setRound] = useState('prelims');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const userRole = getUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole !== 'judge') navigate('/login');
  }, [userRole, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setMessage('');
    if ((!userId && !teamName) || (userId && teamName)) {
      setError('Provide either User ID or Team Name');
      return;
    }
    if (!score) { setError('Enter a score'); return; }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:3000/judge/submit-score',
        { event_id: eventId, user_id: userId || null, team_name: teamName || null, score, round, score_comment: comment },
        { headers: { Authorization: `${token}` } }
      );
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || 'Submit score failed.');
    }
  };

  return (
    <div className="bg-slate-800 min-h-screen text-white flex items-center justify-center">
      <AnimatedForm>
      <h2 className="text-2xl font-bold mb-4 text-center text-orange-500">Submit Score</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputBox type="number" bname="user_id" bvalue={userId} change={(e)=>setUserId(e.target.value)} placeholder="User ID (individual)" category = {false}/>
          <InputBox type="text"   bname="team_name"bvalue={teamName}change={(e)=>setTeamName(e.target.value)}    placeholder="Team Name (team)" category = {false}/>
          <InputBox type="number" bname="score"    bvalue={score}   change={(e)=>setScore(e.target.value)}        placeholder="Score" />

          <div>
            <label className="block mb-1">Round</label>
            <motion.select
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileFocus={{ scale: 1.02, borderColor: "#D4A6A1", boxShadow: "0 0 8px #D4A6A1" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  value={round}
                  onChange ={e=>setRound(e.target.value)} 
                  defaultValue=""
                  className="w-full p-2 rounded-md text-black placeholder-slate-400  focus:outline-none focus:ring-2"
                >
                  <option value="prelims">Prelims</option>
                  <option value="semi-finals">Semi-Finals</option>
                  <option value="finals">Finals</option>
            </motion.select>
          </div>

          <InputBox type="text" bname="score_comment" bvalue={comment} change={(e)=>setComment(e.target.value)} placeholder="Comment (optional)" />
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <SimpleButton text="Submit" type="submit" width="w-full" />
        </form>
      </AnimatedForm>
    </div>
  );
};

export default SubmitScoreForm;