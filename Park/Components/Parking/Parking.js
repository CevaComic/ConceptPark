import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { isOpenParking } from '../../Reducers/modal/selectors'
import { getCars } from '../../Reducers/parking/selectors'
import { setModalStatus } from '../../Reducers/modal/actions'
import styles from './Parking.styles'
import Modal from '../Modal'
import moment from 'moment'

const textOptions = {
	numberOfLines:1,
	adjustsFontSizeToFit: true,
}

function ParkSpotFunction({ id,time,license,index,...props }) {

	const openModal = () => {
		props.setModalStatus({
			component: 'isOpenParking',
			status: true,
			id: id,
			parked: true,
		})
	}

  return (
    <View style={styles.carRow}>
		<TouchableOpacity style={styles.carRowInner} onPress={() => license ? openModal() : null} activeOpacity={license ? 0.7 : 1}>
				<View style={styles.carTop}>
					<View style={styles.carTopNumberView}>
						<Text style={styles.carTopNumber}>
							{index+1}
						</Text>
					</View>

					<View style={styles.carTopImageView}>
						{
							license ? (
								<Image source={require('../../Images/masina.jpeg')} resizeMode="center" style={styles.carTopImage}/>
							) : (
								<Icon name="parking" size={60} color="white" />
							)
						}
					</View>

				</View>

				<View style={styles.carBottom}>
					<Text style={styles.carEmpty} {...textOptions}>
						{license||"EMPTY"}
					</Text>

					<Text style={[styles.carSpot,{color: license ? '#ff4646' : '#1a64af'}]} {...textOptions}>
						{license ? <Text>{moment(new Date(time)).fromNow()}</Text> : "SPOT"}
					</Text>
				</View>
		</TouchableOpacity>

    </View>
  );
}

class Parking extends Component {

	render() {

		const { isOpenParking, cars } = this.props

		return (
			<View style={{flex:1}}>
				<FlatList
					contentContainerStyle={styles.container}
			        data={cars}
			        renderItem={({ item,index }) => <ParkSpot key={item.id} {...item} index={index} />}
			        keyExtractor={item => item.id}
			      />
				  <Modal status={isOpenParking} />
			</View>

		)
	}
}

const mapStateToProps = (state) => {
	return {
		isOpenParking: isOpenParking(state),
		cars: getCars(state),
	}
}

const mapDispatchToProps = dispatch => (bindActionCreators({
	setModalStatus,
}, dispatch))

const ParkSpot = connect(mapStateToProps, mapDispatchToProps)(ParkSpotFunction)
export default connect(mapStateToProps, mapDispatchToProps)(Parking)
