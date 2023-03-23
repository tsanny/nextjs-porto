import React, { useEffect, useState } from 'react'
import { useAuth } from "@/context/AuthContext"
import ExperienceCard from './ExperienceCard'

export default function UserDashboard() {
    const { currentUser } = useAuth()
    const [ experience, setExperience ] = useState({title:'', description:'', startedAt: new Date()})
    const [ experienceList, setExperienceList ] = useState<any>([])

    useEffect(() => {
        loadExperiences()
    }, [])

    async function handleAddExperience() {
        if (!experience.title || !experience.description) { return }
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await currentUser?.getIdToken()}` },
          body: JSON.stringify(experience)
        };
        const response = await fetch('https://portofolio-be-production.up.railway.app/experiences', requestOptions);
        const data = await response.json();
        setExperienceList({...experienceList, [data.id]: data });
        setExperience({description:'', title:'', startedAt:new Date()})
    }

    async function loadExperiences() {
        const requestOptions = {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        };
        const response = await fetch('https://portofolio-be-production.up.railway.app/experiences', requestOptions);
        const data = await response.json();
        setExperienceList(data)
    }

    return (
      <>
        <div className='w-full max-w-[65ch] mx-auto flex flex-col gap-3 sm:gap-5'>
        {currentUser && (
            <>
            <input type='text' placeholder='Enter experience' value={experience.title} onChange={(e) => setExperience({...experience, title:e.target.value})} className='outline-none p-2 text-base sm:text-lg text-slate-900'/>
            <input type='text' placeholder='Enter description' value={experience.description} onChange={(e) => setExperience({...experience, description:e.target.value})} className='outline-none p-2 text-base sm:text-lg text-slate-900'/>
            <button onClick={ handleAddExperience} className="text-cyan-300 border border-solid border-cyan-300 py-2 text-center uppercase text-lg duration-300 hover:opacity-30"> ADD EXPERIENCE</button>
            </>
        )}
        {Object.keys(experienceList).map((key) => {
            return (
                <ExperienceCard key={key} id={key} loadExperiences={loadExperiences}>
                    {experienceList[key]}
                </ExperienceCard>
            )
        })}
        </div>
      </>
    )
  }
  