import React, { Component } from 'react';
import { View, SafeAreaView, Text, StyleSheet, TextInput, FlatList, Image, ActivityIndicator } from 'react-native';
import colors from '../colors';
import Search from '../assets/icons/search.svg';
import Star from '../assets/icons/star.svg';
import { connect } from 'react-redux';
import { getCourse } from '../actions/getCourse';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    this.props.getMyCourse()
  }

  renderitem = (item) => {
    let items = JSON.parse(item)
    return (
      <View style={styles.listContainer}>
        <View style={{ height: "55%" }}>
          <Image style={styles.courseImg} source={require('../assets/images/courseImage.jpeg')} />
          <View style={styles.freeBanner}>
            <Text style={styles.freeText}>FREE</Text>
          </View>
        </View>
        <View style={{ margin: 12 }}>
          <Text style={styles.postTitle}>{items.post_title}</Text>
          <View style={{ marginTop: 10, flexDirection: 'row', }}>
            <View style={styles.ratingConatiner}>
              <Text style={{ color: colors.WHITE, marginRight: 3 }}>4.5</Text>
              <Star height={12} width={12} fill={colors.WHITE} />
            </View>
            <Text style={[styles.coCreated, { marginLeft: 5,alignSelf:'center'  }]}>32k+ Learners</Text>
          </View>
          <Text style={[styles.coCreated,{marginTop:10}]}>Co-created with IBM</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <SafeAreaView >
        <View style={{ height: 70, backgroundColor: colors.HEADER, }}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Intellipat Change</Text>
            <View>
              {/* <Notification fill={"#fff"} height={25} width={25} /> */}
              <View style={{ position: 'absolute', right: 0, top: 5 }}>
                <View style={styles.notfiDot} />
              </View>
            </View>
          </View>
        </View>
        <View style={{ backgroundColor: colors.WHITE }}>
          <View style={styles.inputContainer}>
            <TextInput placeholder={'Search course...'} placeholderTextColor={colors.BLACK} />
            <View style={{marginRight:10}}>
            <Search width={18} height={18} fill={colors.BLACK} />
            </View>
          </View>

          <View style={{ padding: 10, flexDirection: 'row', justifyContent: 'space-between' }}>

            <Text style={styles.freecourse}>Free Courses</Text>
            <Text style={styles.seeAll}>See all</Text>

          </View>

          <View style={{ padding: 10 }}>

            {
              this.props.loader ?
                <ActivityIndicator size={'large'} color={colors.HEADER} />
                :
                <FlatList data={this.props.data}
                  horizontal={true}
                  extraData={this.state}
                  renderItem={({ item }) => this.renderitem(item)}
                  ItemSeparatorComponent={() => {
                    return (
                      <View
                        style={{
                          marginRight: 20
                        }}
                      />
                    );
                  }} />
            }
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => {
  let object = state.freeCourse.data.data;
  let dataArr = []
  for (const property in object) {
    dataArr.push(JSON.stringify(object[property].course_details))
  }
  return {
    data: dataArr,
    loader: state.freeCourse.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMyCourse: () => dispatch(getCourse())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);


const styles = StyleSheet.create({
  notfiDot:{ backgroundColor: 'red', width: 10, height: 10, borderRadius: 10 / 2 },
  header:{ marginTop: 15, marginRight: 15, marginLeft: 15, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' },
  coCreated: { color: colors.BLACK, opacity: 0.6 },
  ratingConatiner: { justifyContent: 'center', alignItems: 'center', flexDirection: 'row', width: '22%',height:25, borderRadius: 22, backgroundColor: colors.ORANGE },
  postTitle: { color: colors.BLACK, fontSize: 15, fontWeight: 'bold' },
  freeText: { color: colors.BLACK, textAlign: 'center', fontSize: 14,fontWeight:'bold' },
  freeBanner: { position: 'absolute', right: 0, top: 25, width: '18%', padding: 5, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: colors.YELLOW },
  courseImg: { width: "100%", height: "100%", borderRadius: 5 },
  listContainer: {marginBottom:30, backgroundColor: colors.WHITE, width: 315, height: '73%', borderRadius: 5, borderColor: colors.WHITE, elevation: 3 },
  headerText: {
    color: colors.WHITE,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10
  }, inputContainer: {
    margin: 10,
    borderRadius: 5,
    borderColor: colors.BLACK, 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor:"#e1e3f0",opacity:0.7
  },
  freecourse: {
    fontSize: 18,
    color: colors.BLACK,
    fontWeight: 'bold'
  },
  seeAll: {
    fontSize: 14,
    color: colors.HEADER
  }
})