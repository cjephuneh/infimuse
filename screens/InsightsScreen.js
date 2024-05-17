import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import tw from "tailwind-react-native-classnames";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const InsightsScreen = () => {
  return (
    <ScrollView style={tw`bg-gray-100 flex-1 p-4`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Insights</Text>

      {/* Students Attended Listing Graph */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-semibold mb-2`}>Students Attended Listing</Text>
        <LineChart
          data={{
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
                strokeWidth: 2,
              },
            ],
          }}
          width={screenWidth - 32}
          height={220}
          yAxisLabel=""
          yAxisSuffix=" students"
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      {/* Second Graph */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-semibold mb-2`}>Second Graph Title</Text>
        <BarChart
          data={{
            labels: ["January", "February", "March", "April", "May", "June"],
            datasets: [
              {
                data: [20, 45, 28, 80, 99, 43],
              },
            ],
          }}
          width={screenWidth - 32}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      {/* Third Graph */}
      <View style={tw`mb-6`}>
        <Text style={tw`text-lg font-semibold mb-2`}>Third Graph Title</Text>
        <PieChart
          data={[
            {
              name: "Class A",
              population: 21500000,
              color: "rgba(131, 167, 234, 1)",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
            {
              name: "Class B",
              population: 2800000,
              color: "#F00",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
            {
              name: "Class C",
              population: 527612,
              color: "red",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
            {
              name: "Class D",
              population: 8538000,
              color: "#ffffff",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
            {
              name: "Class E",
              population: 11920000,
              color: "rgb(0, 0, 255)",
              legendFontColor: "#7F7F7F",
              legendFontSize: 15,
            },
          ]}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: "#ffffff",
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </ScrollView>
  );
};

export default InsightsScreen;
