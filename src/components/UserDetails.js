import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

const UserDetails = () => {
  return (
    <View>
      <Text>UserDetails</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
