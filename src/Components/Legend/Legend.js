import React from 'react'
import sportsData from '../../assets/data/sports.json'

const reqSvgs = require.context('../../assets/icons', true, /\.svg$/)
const sports = sportsData.list.map(sport => ({
	...sport,
	icon: reqSvgs(`./${sport.key}.svg`)
}))

const style = {
  card: {
  	position: 'absolute',
  	bottom: '40px',
  	left: '10px',
  	height: '250px',
  	backgroundColor : 'white',
  	zIndex: '10',
  	overflowY: 'scroll'
  },
  cardHeader: {
  	alignItems: 'center'
  },
  cardHeaderTitle: {
  	padding: '5px 0',
  	color: '#00aec7',
  	fontSize: '1rem'
  },
  delete: {
  	marginRight: '5px'
  },
  cardContent: {
  	padding: '10px 20px'
  },
  legendRow: {
  	margin: '3px 0',
  	display: 'flex',
  	alignItems: 'center'
  },
  icon: {
    height: '20px',
    width: '20px',
    marginRight: '10px'
  },
  name: {
  	fontSize: '.8rem'
  }
}

export default function Legend(props) {
  if (props.visible) {
  	return(
			<div className="card" style={style.card}>
				<div className="card-header" style={style.cardHeader}>
					<p className="card-header-title is-centered" style={style.cardHeaderTitle}>LEYENDA</p>
					<button className="delete" style={style.delete} onClick={() => props.toggleComponent('legend')}></button>
				</div>
				<div className="card-content" style={style.cardContent}>
					{sports.map(sport => (
						<div style={style.legendRow} key={sport.key}>
							<img src={sport.icon} style={style.icon} alt={sport.key} />
							<span style={style.name}>{sport.name}</span>
						</div>
					))}
				</div>
			</div>
  	);
  } else {
  	return null;
  }
}