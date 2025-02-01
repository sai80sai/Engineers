import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { collection, getDocs, query } from 'firebase/firestore';
import {db} from '../../app/configs/firebaseConfigs';
import Clist from './Clist';
import { useRouter } from 'expo-router';


export default function Courses() {
  const [courseList, setCourseList] = useState([]);
  const router=useRouter();

  useEffect(() => {
    GetCourseList();
  }, []);

  const GetCourseList = async () => {
    setCourseList([]);
    const q = query(collection(db, 'Course'));
    const querySnapshot = await getDocs(q);

    const course = [];
    querySnapshot.forEach((doc) => {
      course.push(doc.data());
    });
    setCourseList(course);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Courses</Text>
      <FlatList
        data={courseList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Clist course={item}
        onCoursePress={(course)=>router.push('/CourseList/'+item.name)}
        />}
        horizontal
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',

  },
  listContainer: {
    alignItems: 'center',
  },
});
