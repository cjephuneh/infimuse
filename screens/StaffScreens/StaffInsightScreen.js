import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import tw from "tailwind-react-native-classnames";
import { LineChart, BarChart, PieChart, ProgressChart } from "react-native-chart-kit";
import StarRating from 'react-native-star-rating-widget';

const screenWidth = Dimensions.get("window").width;

const StaffInsights = () => {
  const metrics = [
    { label: "Number of Sessions this month", value: "25" },
    { label: "Hours Completed", value: "50" },
    { label: "Earnings", value: "$2000" },
    { label: "Total Attendees", value: "120" },
    { label: "Unique Attendees", value: "80" },
    { label: "Working Days", value: "20" },
    { label: "Avg Session Rating", value: "4.3" },
  ];

  const progressData = {
    labels: ["Hours", "Earnings", "Attendees", "Unique", "Days"], // optional
    data: [0.5, 0.8, 0.75, 0.6, 0.7]
  };

  return (
    <ScrollView style={tw`bg-gray-100 flex-1`}>
      <View style={tw`p-4`}>
        <Text style={tw`text-3xl font-bold text-purple-700 mb-6`}>Insights</Text>

        {/* Metrics with progress chart */}
        <View style={tw`mb-8 bg-white rounded-lg shadow-md p-4`}>
          <Text style={tw`text-lg font-semibold text-purple-700 mb-2`}>Overall Performance</Text>
          <ProgressChart
            data={progressData}
            width={screenWidth - 48}
            height={220}
            strokeWidth={16}
            radius={32}
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </View>

        {/* Individual Metrics */}
        <View style={tw`mb-8`}>
          {metrics.map((metric, index) => (
            <View key={index} style={tw`mb-4 bg-white rounded-lg shadow-md p-4 flex-row justify-between items-center`}>
              <View>
                <Text style={tw`text-lg font-semibold text-purple-700`}>{metric.label}</Text>
                <Text style={tw`text-2xl font-bold text-gray-800`}>{metric.value}</Text>
              </View>
              <View>
                <PieChart
                  data={[
                    {
                      name: metric.label,
                      population: parseFloat(metric.value.replace(/[^\d.-]/g, '')),
                      color: `rgba(76, 175, 80, ${index / 7 + 0.3})`,
                      legendFontColor: "#7F7F7F",
                      legendFontSize: 15,
                    },
                  ]}
                  width={80}
                  height={80}
                  chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
                  }}
                  accessor="population"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  hasLegend={false}
                  absolute
                  style={{
                    borderRadius: 40,
                  }}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Students Attended Listing Graph */}
        <View style={tw`mb-8 bg-white rounded-lg shadow-md p-4`}>
          <Text style={tw`text-lg font-semibold text-purple-700 mb-2`}>Students Attended Listing</Text>
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
            width={screenWidth - 48}
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

        {/* Revenue by Month Graph */}
        <View style={tw`mb-8 bg-white rounded-lg shadow-md p-4`}>
          <Text style={tw`text-lg font-semibold text-purple-700 mb-2`}>Revenue by Month</Text>
          <BarChart
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              datasets: [
                {
                  data: [12000, 18000, 22000, 15000, 28000, 20000],
                },
              ],
            }}
            width={screenWidth - 48}
            height={220}
            yAxisLabel="$"
            yAxisSuffix=""
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
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

        {/* Class Distribution Graph */}
        <View style={tw`mb-8 bg-white rounded-lg shadow-md p-4`}>
          <Text style={tw`text-lg font-semibold text-purple-700 mb-2`}>Class Distribution</Text>
          <PieChart
            data={[
              {
                name: "Dojo",
                population: 21,
                color: "#A72C76",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "Boxing",
                population: 12,
                color: "#F9A109",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "Coding",
                population: 8,
                color: "#2AC769",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "Therapy",
                population: 15,
                color: "#5A67D8",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
              {
                name: "Infimuse",
                population: 6,
                color: "#E53E3E",
                legendFontColor: "#7F7F7F",
                legendFontSize: 15,
              },
            ]}
            width={screenWidth - 48}
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

        {/* Pay Staff / Set Up Recurring Payment Transfers */}
        <View style={tw`mb-8 bg-white rounded-lg shadow-md p-4`}>
          <Text style={tw`text-lg font-semibold text-purple-700 mb-2`}>Pay Staff / Set Up Recurring Payment Transfers</Text>
          {/* Add your functionality for setting up recurring payments here */}
          <Text style={tw`text-gray-800`}>Functionality to be implemented.</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default StaffInsights;
