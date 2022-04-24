import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, FlatList, ActivityIndicator } from 'react-native';
import colors from '../colors';
import Search from '../assets/icons/search.svg';
import Book from '../assets/icons/book.svg';
import { connect } from 'react-redux';
import { getMyCourse, searchCourse, clearSearchCourse } from '../actions/getCourse';
import * as Progress from 'react-native-progress';

class myCourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchCourse: '',
      showSearch: false
    };

  }

  componentDidMount() {
    this.props.getMyCourseFunc();
  }

  renderMyCourse = (item) => {
    return (
      <View style={styles.listContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Book width={35} height={35} fill={colors.ORANGE} />
          <View style={{ width: '100%', marginLeft: 10 }}>
            <Text style={styles.title}>{item.post_title}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.modulesText}>{item.completed_modules}/</Text>
              <Text style={styles.modulesText}>{item.total_modules} Modules Completed</Text>
            </View>
            <View style={styles.buttonContainer}>
              <View style={styles.updatedConatiner}>
                <Text style={{ textAlign: 'center', color: colors.DARK_GREEN }}>Updated</Text>
              </View>

              <View style={styles.continuContainer}>
                <Text style={{ textAlign: 'center', color: colors.WHITE }}>Continue</Text>
              </View>
            </View>

          </View>
        </View>

        <View style={styles.progressContainer}>
          <Text style={[styles.modulesText, { marginBottom: 5 }]}>{item.completed_modules_percentage}% Complete</Text>
          <Progress.Bar height={7} unfilledColor={colors.SMOKE_WHITE}
            borderColor={colors.SMOKE_WHITE} progress={item.completed_modules_percentage / 100}
            width={325} color={colors.HEADER} />
        </View>
      </View>
    )
  }

  searchFunc = (text) => {
    if (text == "") {
      this.setState({ searchCourse: text, showSearch: false })
      this.props.clearSearch()
      return true;
    }
    this.setState({ searchCourse: text, showSearch: true })
    this.props.searchCourseFunc(text)

  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#e3e3e3" }}>
        <View style={styles.myCourseContainer}>
          <Text style={styles.headerText}>My Courses</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput value={this.state.searchCourse}
            placeholder={'Search your course here...'}
            placeholderTextColor={colors.BLACK}
            multiline={true}
            style={{ color: colors.BLACK }}
            onChangeText={(text) => this.searchFunc(text)} />
          <View style={{ marginRight: 10 }}>
            <Search width={18} height={18} fill={colors.BLACK} />
          </View>
        </View>
        {
          this.state.showSearch ?
            <View style={{ margin: 12 }}>
              {
                this.props.searchLoader ?
                  <ActivityIndicator size={'large'} color={colors.HEADER} />
                  :
                  (
                    this.props.searchData ?.length == 0 || this.props.searchData == undefined ?
                      <Text style={{ textAlign: 'center', fontSize: 18, color: colors.BLACK, fontWeight: 'bold' }}>No data found</Text>
                      :

                      <FlatList data={this.props.searchData}
                        extraData={this.state}
                        renderItem={({ item }) => this.renderMyCourse(item)}
                        ItemSeparatorComponent={() => {
                          return (
                            <View
                              style={{
                                marginBottom: 10
                              }}
                            />
                          );
                        }} />
                      
                      
                  )

              }
            </View>
            :
            <View style={{ margin: 12 }}>
              {
                this.props.loader ?
                  <ActivityIndicator size={'large'} color={colors.HEADER} />
                  :
                  <FlatList data={this.props.data}
                    extraData={this.state}
                    renderItem={({ item }) => this.renderMyCourse(item)}
                    ItemSeparatorComponent={() => {
                      return (
                        <View
                          style={{
                            marginBottom: 10
                          }}
                        />
                      );
                    }} />
              }
            </View>
        }



      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {


  var myCourseArr = [], searchArr = []
  if (state.myCourse.data.length > 0) {
    myCourseArr = JSON.parse(state.myCourse ?.data ?.split('getMycourseshello')[1])
  }


  if (state.search.data.length > 0) {
    searchArr = JSON.parse(state.search ?.data ?.split('getMycourseshello')[1])
  }

  return {
    data: myCourseArr ?.data ?.my_courses,
    loader: state.myCourse.loading,
    searchLoader: state.search.loading,
    searchData: searchArr ?.data ?.my_courses,
  }

}

const mapDispatchToProps = dispatch => {

  return {
    getMyCourseFunc: () => dispatch(getMyCourse()),
    searchCourseFunc: (data) => dispatch(searchCourse(data)),
    clearSearch: () => dispatch(clearSearchCourse())
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(myCourse);

const styles = StyleSheet.create({
  myCourseContainer: { justifyContent: 'center', height: 70, backgroundColor: colors.HEADER },
  modulesText: { color: colors.BLACK, marginTop: 10, opacity: 0.6 },
  title: { color: colors.BLACK, fontSize: 16, fontWeight: 'bold' },
  listContainer: { padding: 12, backgroundColor: colors.WHITE, borderRadius: 5, borderColor: colors.WHITE, elevation: 3 },
  inputContainer: {
    backgroundColor: colors.WHITE,
    margin: 10,
    borderRadius: 4,
    borderColor: colors.BLACK, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
  },
  headerText: {
    color: colors.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  buttonContainer: { marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' },
  updatedConatiner: { height: 25, alignSelf: 'center', justifyContent: 'center', width: 85, backgroundColor: colors.LIGHT_GREEN, borderRadius: 15 },
  continuContainer: { right: 70, width: 85, backgroundColor: colors.ORANGE, padding: 7, borderRadius: 10 },
  progressContainer: { marginLeft: 15, marginTop: 18, marginBottom: 10 }
})