import React from 'react'

export function ProfileStats({ profile }) {
  return (
    <div className='grid grid-cols-3'>
      <div className="col-span-2">
        <div className="text-3xl">Biography</div>
        <div>
          {profile.biography}
        </div>
      </div>
      <div>
        <div className="text-3xl">Stats</div>
        <div className='grid grid-cols-2'>
          <div>
            <div>Total attempts</div>
            <div>Approved attempts</div>
            <div>Approved %</div>
            <div>Full Score %</div>
            <div>Average score</div>
          </div>
          <div>
            <div>{profile.attempts_count}</div>
            <div>{profile.total_approved}</div>
            <div>{profile.approved_percentage} %</div>
            <div>{profile.full_score_percentage} %</div>
            <div>{profile.average_score} / 100</div>
          </div>
        </div>
      </div>
    </div>
  )
}
