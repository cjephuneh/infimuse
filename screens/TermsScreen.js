import React from 'react';
import { View, Text, ScrollView, StatusBar } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const TermsAndConditionsScreen = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView contentContainerStyle={tw`p-4`}>
        <View style={tw`flex-1 items-center justify-center`}>
          <Text style={[tw`text-3xl font-bold mb-6`, { color: '#A72C76' }]}>Terms and Conditions</Text>
          <View style={tw`w-full`}>
            <Text style={tw`text-lg mb-4`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non feugiat mi. Phasellus dictum
              placerat justo, et finibus purus suscipit ut. Nam faucibus sapien nec mi convallis congue. Vivamus
              eget eros dui. Aenean sagittis nunc a commodo congue. Vestibulum ante ipsum primis in faucibus orci
              luctus et ultrices posuere cubilia Curae; Nam lobortis purus auctor risus tempus, nec eleifend velit
              hendrerit. Nullam ac sodales tortor. Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas.
            </Text>
            <Text style={tw`text-lg mb-4`}>
              Fusce ut scelerisque metus, nec consequat velit. Vestibulum ac vehicula sem. Mauris vulputate leo ut
              neque finibus, id faucibus quam tempor. Mauris sem sapien, sodales in luctus nec, finibus vel urna.
              Nulla tincidunt efficitur ipsum, at congue eros efficitur nec. Sed non dignissim dui, ac volutpat
              enim. Vestibulum nec purus nec mi efficitur semper et id mi. Morbi eget eros orci.
            </Text>
            <Text style={tw`text-lg mb-4`}>
              Integer suscipit auctor felis, ac congue elit hendrerit ut. Donec at enim dui. Praesent at laoreet
              nisi. In vel quam convallis, gravida risus non, malesuada ipsum. Aliquam vel risus ex. Aenean
              accumsan lobortis lectus, et scelerisque risus luctus at. Duis non velit a nunc tempus lobortis.
              Fusce dapibus ac risus non hendrerit. Ut tincidunt leo id odio pharetra feugiat.
            </Text>
            <Text style={tw`text-lg mb-4`}>
              Sed eget enim sed justo suscipit aliquam sit amet non est. Duis accumsan elit nec magna ultrices
              efficitur. Nam sed placerat lacus. Morbi fermentum eleifend eros, et vehicula nulla ultricies vel.
              Sed commodo quam vitae erat egestas, non lacinia nisi viverra. Vestibulum ante ipsum primis in
              faucibus orci luctus et ultrices posuere cubilia Curae; Ut viverra eu ex eu posuere. Nam id orci a
              mi pharetra luctus id eget justo.
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default TermsAndConditionsScreen;
