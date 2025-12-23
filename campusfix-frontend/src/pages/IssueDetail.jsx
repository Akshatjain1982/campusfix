import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import Spinner from '../components/Spinner';


export default function IssueDetail(){
const { id } = useParams();
const [issue,setIssue]=useState(null);
const [loading,setLoading]=useState(true);
const [comment,setComment]=useState('');


useEffect(()=>{ load(); },[]);
async function load(){
try{ const res = await api.get(`/issues/${id}`); setIssue(res.data); }
catch(e){ console.error(e); }
finally{ setLoading(false); }
}


async function addComment(){
try{ await api.post(`/issues/${id}/comment`, { text: comment }); setComment(''); load(); }
catch(e){ console.error(e); }
}


if (loading) return <Spinner/>;
if (!issue) return <div className="p-6">Issue not found</div>;
return (
<div className="p-6 max-w-3xl mx-auto">
<h1 className="text-2xl font-bold">{issue.title}</h1>
<p className="text-gray-600">{issue.location} • {issue.priority} • {issue.status}</p>
<div className="mt-4">
{issue.imageUrl && <img src={issue.imageUrl.startsWith('http')?issue.imageUrl:`${process.env.REACT_APP_API_URL?.replace('/api','')||'http://localhost:5000'}${issue.imageUrl}`} alt="issue" className="w-full max-h-96 object-cover"/>}
</div>
<p className="mt-4">{issue.description}</p>


<div className="mt-6">
<h3 className="font-semibold">Comments</h3>
<div className="space-y-2 mt-2">
{issue.comments && issue.comments.length ? issue.comments.map(c=> (
<div key={c._id} className="border p-2 rounded">{c.text}</div>
)) : <div>No comments</div>}
</div>
<div className="mt-3 flex gap-2">
<input value={comment} onChange={e=>setComment(e.target.value)} placeholder="Add comment" className="flex-1 border p-2" />
<button onClick={addComment} className="bg-blue-600 text-white px-3 py-1 rounded">Add</button>
</div>
</div>
</div>
);
}