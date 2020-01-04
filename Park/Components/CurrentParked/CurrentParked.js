import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import styles from './CurrentParked.styles'
import Modal from '../Modal'
import {getParkedCars,getHistory} from '../../Reducers/parking/selectors'
import {isOpenHistory,isOpenParked} from '../../Reducers/modal/selectors'
import {setModalStatus} from '../../Reducers/modal/actions'

function CarRowFunction({ license,id,index,left,...props }) {

	const openModal = () => {
		props.setModalStatus({
			component: left ? 'isOpenHistory' : 'isOpenParked',
			status: true,
			id: id,
			parked: !left,
		})
	}

  return (
    <TouchableOpacity
		onPress={() => openModal()}
		style={[styles.carRow,{backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff'}]}>
		<View style={styles.carRowLeft}>
			<Text style={styles.carRowIndex}>
				{index+1}.
			</Text>

		  	<Text style={styles.carRowLicense}>
				{license}
			</Text>
		</View>

		<Icon name="keyboard-arrow-right" size={25} color="black" />
    </TouchableOpacity>
  );
}

class CurrentParked extends Component {

	render() {

		const { cars,isOpenParked,isOpenHistory,navigation } = this.props
		const isHistory = Boolean(navigation && navigation.state && navigation.state.params && navigation.state.params.history)

		return (
			<View style={styles.container}>
				<FlatList
			        data={cars}
			        renderItem={({ item,index }) => <CarRow {...item} index={index} />}
			        keyExtractor={item => item.id}
			      />
				  <Modal status={isOpenParked} />
				  <Modal status={isOpenHistory} />
			</View>
		)
	}
}

const mapStateToProps = (state,ownProps) => {
	let data = getParkedCars(state)
	const isHistory = ownProps.navigation && ownProps.navigation.state && ownProps.navigation.state.params && ownProps.navigation.state.params.history
	if(isHistory)
		data = getHistory(state)
	return {
		cars: data,
		isOpenHistory: isOpenHistory(state),
		isOpenParked: isOpenParked(state),
	}
}

const mapDispatchToProps = dispatch => (bindActionCreators({
	setModalStatus
}, dispatch))

const CarRow = connect(mapStateToProps, mapDispatchToProps)(CarRowFunction)
export default connect(mapStateToProps, mapDispatchToProps)(CurrentParked)
