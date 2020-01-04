import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text as RText, FlatList, TouchableOpacity, Image, Switch, Modal,TextInput,Alert } from 'react-native'
import Icon from 'react-native-vector-icons/Octicons'
import FIcon from 'react-native-vector-icons/FontAwesome'
import styles from './Settings.styles'
import { adminSelector, analitycsSelector } from '../../Reducers/parking/selectors'
import { setOption,setPrice,resetApplication } from '../../Reducers/parking/actions'
import { setModalStatus,closeModal } from '../../Reducers/modal/actions'
import AsyncStorage from '@react-native-community/async-storage'

const Text = ({ children,style }) => <RText style={[styles.text,style !== undefined && style]}>{children}</RText>

const SText = ({ children,style }) => <RText style={[styles.stext,style !== undefined && style]}>{children}</RText>

class Settings extends Component {

	state = {
		price:this.props.price,
		error: false,
	}

	setPrice = async () => {
		const { price } = this.state
		if(price > 0) {
			await this.props.setPrice(price)
			this.close()
		} else {
			this.setState({
				error: true,
			})
		}
	}

	close = () => {
		this.props.closeModal()
		this.setState({
			price:this.props.price,
			error:false,
		})
	}

	reset = () => {
		Alert.alert(
		  'Confirmation',
		  'Are you sure you want to reset the app  ?',
		  [
		    {
		      text: 'Cancel',
		      onPress: () => null,
		      style: 'cancel',
		    },
		    {
				text: 'OK',
				onPress: () => {
					AsyncStorage.clear()
					this.props.resetApplication()
				}
			},
		  ],
		  {cancelable: false},
		)
	}

	render() {

		const { region,infrared,open,price,setOption,isOpenEditPrice,setModalStatus } = this.props
		const { totalcars, uniquecars, average, money } = this.props

		return (
			<View style={styles.container}>

				<View style={styles.analitycsView}>

					<Text style={styles.title}>
						ANALITYCS
					</Text>

					<View style={styles.analitycsContent}>
						<View style={styles.analitycsContentLeft}>
							<Text style={{paddingTop: 0}}>UNIQUE CARS</Text>
							<Text>TOTAL CARS</Text>
							<Text>AVG. TIME OF STAY</Text>
							<Text style={{paddingBottom: 0}}>TOTAL MONEY MADE</Text>
						</View>

						<View style={styles.analitycsContentRight}>
							<Text style={{fontWeight: '900',paddingTop: 0}}>{uniquecars}</Text>
							<Text style={{fontWeight: '900'}}>{totalcars}</Text>
							<Text style={{fontWeight: '900'}}>{average} {average > 1 ? 'mins' : 'min'}</Text>
							<Text style={{fontWeight: '900',paddingBottom: 0}}>$ {money}</Text>
						</View>
					</View>

				</View>

				<View style={styles.settingsContainer}>
					<SText style={[styles.title]}>
						SETTINGS
					</SText>


					<View style={[styles.settingsRow,{backgroundColor: '#fafafa'}]}>
						<SText>
							REGION
						</SText>

						<View style={[styles.settingsRowRight,styles.region]}>
							<TouchableOpacity activeOpacity={0.7} onPress={() => region !== 'us' && setOption({region:'us'})}>
								<SText style={[styles.regionOption,region === 'us' ? styles.regionOptionActive : styles.regionOptionInactive]}>
									USA
								</SText>
							</TouchableOpacity>
							<TouchableOpacity activeOpacity={0.7} onPress={() => region === 'us' && setOption({region:'eu'})}>
								<SText style={[styles.regionOption,region !== 'us' ? styles.regionOptionActive : styles.regionOptionInactive]}>
									EUROPE
								</SText>
							</TouchableOpacity>
						</View>

					</View>

					<View style={[styles.settingsRow,{backgroundColor: '#fff'}]}>
						<SText>
							PARK STATUS
						</SText>

						<Switch
							value={open}
							trackColor={{true:'#ff4646'}}
							onChange={() => setOption({open:!open})}
							style={styles.settingsRowRight}
						/>
					</View>

					<View style={[styles.settingsRow,{backgroundColor: '#fafafa'}]}>
						<SText>
							INFRARED
						</SText>

						<Switch
							value={infrared}
							trackColor={{true:'#ff4646'}}
							onChange={() => setOption({infrared:!Boolean(infrared)})}
							style={styles.settingsRowRight}
						/>
					</View>

					<View style={[styles.settingsRow,{backgroundColor: '#fff'}]}>
						<SText>
							PRICE PER HOUR
						</SText>

						<View style={[styles.settingsRowRight,{flexDirection: 'row'}]}>
							<SText style={[styles.regionOption,{width: 'auto'}]}>
								$ {price}
							</SText>
							<Icon name="pencil" size={15} color="black" style={{marginLeft: 10}} onPress={() => setModalStatus({component:'isOpenEditPrice',status:true})}/>
						</View>
					</View>

					<TouchableOpacity style={[styles.buttonView,styles.buttonsHistory]} onPress={this.reset}>
						<RText style={styles.buttonsHistoryText}>
							RESET APP
						</RText>
					</TouchableOpacity>

				</View>

				<Modal
				  animationType="fade"
				  transparent={true}
				  visible={isOpenEditPrice}
				 >
				  <View style={[styles.modalPrice]}>
					<View style={[styles.modalInnerPrice]}>
							<TouchableOpacity style={styles.modalClose} onPress={() => this.close()}>
								<Icon name="x" size={20} color="white" />
							</TouchableOpacity>
							<RText style={[styles.modalPriceTitle,this.state.error && {color: 'red'}]}>
								{ this.state.error ? 'WRONG PRICE' : 'EDIT PRICE PER HOUR'}
							</RText>
							<View style={styles.modalPriceBottomView}>
								<FIcon name="usd" size={22} color="black" />
								<TextInput
									keyboardType="numeric"
									style={styles.modalPriceInput}
									onChangeText={price => this.setState({price})}
									value={this.state.price}
							    />
								<TouchableOpacity onPress={() => this.setPrice()}>
									<Text style={styles.modalPriceOk}>OK</Text>
								</TouchableOpacity>
							</View>
					</View>

				  </View>
				</Modal>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	let status = adminSelector(state)
	let analitycs = analitycsSelector(state)
	return {
		...status,
		...analitycs
	}
}

const mapDispatchToProps = dispatch => (bindActionCreators({
	setOption,
	setModalStatus,
	closeModal,
	setPrice,
	resetApplication
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
