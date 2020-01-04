import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, Text } from 'react-native'

class Component extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>I'm the Component component</Text>
			</View>
		)
	}
}

const mapStateToProps = (state) => {
	return {
	// var: selector(state)
	}
}

const mapDispatchToProps = dispatch => (bindActionCreators({
// actions
}, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(Component)
