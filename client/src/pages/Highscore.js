import { useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import ProfileList from '../components/ProfileList';

import { QUERY_PROFILES } from '../utils/queries';
import Footer from '../components/Footer';

const Highscore = () => {
    const { highScoreId } = useParams();

return (
<div>
<div className="header">
<h1>Top Debaters</h1>
</div>
<div>
    <div id="main" >
        <div id="C1" className="large-container" >
            <h2>Are you the Master Debater?</h2>
            <ul>Current Debaters</ul>
        </div>
    </div>
</div>
</div>

)
}