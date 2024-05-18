import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
import tw from "tailwind-react-native-classnames";
import { LineChart, BarChart, PieChart } from "react-native-chart-kit";
import StarRating from 'react-native-star-rating-widget';

const screenWidth = Dimensions.get("window").width;

const InsightsScreen = () => {
  const ratings = [
    { className: "Dojo", rating: 4.5 },
    { className: "Boxing", rating: 3.8 },
    { className: "Coding", rating: 5 },
    { className: "Therapy", rating: 4.2 },
    { className: "Infimuse", rating: 3.6 },
  ];

  return (
    <ScrollView style={tw`bg-gray-100 flex-1`}>
      <View style={tw`p-4`}>
        <Text style={tw`text-3xl font-bold text-purple-700 mb-6`}>Insights</Text>

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

        {/* Second Graph */}
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

        {/* Third Graph */}
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

        {/* Ratings List */}
        <View style={tw`mb-8`}>
          <Text style={tw`text-lg font-semibold text-purple-700 mb-2`}>Class Ratings</Text>
          {ratings.map((rating) => (
            <View key={rating.className} style={tw`mb-4 bg-white rounded-lg shadow-md p-4`}>
              <Text style={tw`text-lg font-semibold text-purple-700`}>{rating.className}</Text>
              <StarRating
                rating={rating.rating}
                onChange={() => {}}
                starSize={20}
                color="#A72C76"
                style={tw`mt-2`}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default InsightsScreen;