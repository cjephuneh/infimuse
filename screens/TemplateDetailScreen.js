import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, Image, Button } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getWorkshop, updateWorkshop } from '../redux/slice/listings/workshopService';
import { getClassSession, updateClassSession } from '../redux/slice/listings/classService';
import { getaPackage, updatePackage } from '../redux/slice/listings/packagesServices';
import Share from 'react-native-share';

import { Canvas, Image as CanvasImage, useCanvas } from 'react-native-canvas';

const TemplateDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    posterUrl: '',
    duration: '',
    startDate: '',
    endDate: '',
    capacity: '',
    price: '',
    ageGroup: '',
    ageMin: '',
    ageMax: '',
  });
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { templateType, templateId } = route.params;
        let response;
        switch (templateType) {
          case 'workshops':
            response = await getWorkshop(templateId);
            break;
          case 'classes':
            response = await getClassSession(templateId);
            break;
          case 'packages':
            response = await getaPackage(templateId);
            break;
          default:
            throw new Error('Invalid template type');
        }
        console.log('Fetched details response:', response); // Log the response

        // Update formData state with the fetched data
        setFormData(response.Data);

        // Update template state with the fetched data
        setTemplate(response.Data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching template:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [route.params]);

  const handleUpdateTemplate = async () => {
    try {
      setLoading(true);
      const token = ''; // Retrieve token from AsyncStorage
      if (!token) {
        // Handle token not found
        return;
      }
      const updatedTemplate = { ...template, ...formData };
      let response;
      switch (template) {
        case 'workshops':
          response = await updateWorkshop(updatedTemplate, token);
          break;
        case 'classes':
          response = await updateClassSession(updatedTemplate, token);
          break;
        case 'packages':
          response = await updatePackage(updatedTemplate, token);
          break;
        default:
          throw new Error('Invalid template type');
      }
      if (response && response.status === 'success') {
        // Handle success
        console.log('Template updated successfully');
      } else {
        // Handle error
        console.error('Failed to update template');
      }
    } catch (error) {
      console.error('Error updating template:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      const posterImage = new CanvasImage(canvas);
      posterImage.src = '../assets/Enriching activities.png';

      posterImage.addEventListener('load', () => {
        context.drawImage(posterImage, 0, 0, canvas.width, canvas.height);
        context.fillStyle = 'black';
        context.font = '20px Arial';

        // Adding the data to the poster
        context.fillText(`Title: ${formData.title}`, 50, 50);
        context.fillText(`Description: ${formData.description}`, 50, 100);
        context.fillText(`Duration: ${formData.duration}`, 50, 150);
        context.fillText(`Start Date: ${formData.startDate}`, 50, 200);
        context.fillText(`End Date: ${formData.endDate}`, 50, 250);
        context.fillText(`Capacity: ${formData.capacity}`, 50, 300);
        context.fillText(`Price: ${formData.price}`, 50, 350);

        canvas.toDataURL('image/png', (dataUrl) => {
          const shareOptions = {
            title: 'Share Template',
            message: 'Check out this template!',
            url: dataUrl,
            subject: 'Template Details'
          };

          Share.open(shareOptions)
            .then((res) => console.log(res))
            .catch((err) => console.error(err));
        });
      });
    }
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!template) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <Text>Error fetching template</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={tw`p-4 bg-gray-100 flex-grow`}>
      <View style={tw`mb-8 p-4 bg-white rounded-lg shadow-md`}>
        <Text style={tw`text-3xl font-bold text-gray-800 mb-4`}>Template Details</Text>
        
        {/* Title Input */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg text-gray-600 mb-2`}>Title</Text>
          <TextInput
            style={tw`border p-3 border-gray-300 rounded-lg text-lg shadow-sm`}
            value={formData.title}
            onChangeText={(title) => setFormData({ ...formData, title })}
          />
        </View>

        {/* Description Input */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg text-gray-600 mb-2`}>Description</Text>
          <TextInput
            style={tw`border p-3 border-gray-300 rounded-lg text-lg shadow-sm`}
            value={formData.description}
            onChangeText={(description) => setFormData({ ...formData, description })}
          />
        </View>

        {/* Poster URL */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg text-gray-600 mb-2`}>Poster</Text>
          <Image
            source={{ uri: formData.posterUrl }}
            style={tw`h-40 w-full mb-4 rounded-lg`}
            resizeMode="cover"
          />
        </View>

        {/* Duration Input */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg text-gray-600 mb-2`}>Duration</Text>
          <TextInput
            style={tw`border p-3 border-gray-300 rounded-lg text-lg shadow-sm`}
            value={formData.duration}
            onChangeText={(duration) => setFormData({ ...formData, duration })}
          />
        </View>

        {/* Start Date Input */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg text-gray-600 mb-2`}>Start Date</Text>
          <TextInput
            style={tw`border p-3 border-gray-300 rounded-lg text-lg shadow-sm`}
            value={formData.startDate}
            onChangeText={(startDate) => setFormData({ ...formData, startDate })}
          />
        </View>

        {/* End Date Input */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg text-gray-600 mb-2`}>End Date</Text>
          <TextInput
            style={tw`border p-3 border-gray-300 rounded-lg text-lg shadow-sm`}
            value={formData.endDate}
            onChangeText={(endDate) => setFormData({ ...formData, endDate })}
          />
        </View>

        {/* Capacity Input */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg text-gray-600 mb-2`}>Capacity</Text>
          <TextInput
            style={tw`border p-3 border-gray-300 rounded-lg text-lg shadow-sm`}
            value={formData.capacity.toString()}
            onChangeText={(capacity) => setFormData({ ...formData, capacity })}
          />
        </View>

        {/* Price Input */}
        <View style={tw`mb-4`}>
          <Text style={tw`text-lg text-gray-600 mb-2`}>Price</Text>
          <TextInput
            style={tw`border p-3 border-gray-300 rounded-lg text-lg shadow-sm`}
            value={formData.price.toString()}
            onChangeText={(price) => setFormData({ ...formData, price })}
          />
        </View>

        {/* Update Template Button */}
        <TouchableOpacity
          style={tw`rounded-lg bg-purple-700 p-4 items-center shadow-md`}
          onPress={handleUpdateTemplate}
        >
          <Text style={tw`text-white font-semibold text-lg`}>Update Template</Text>
        </TouchableOpacity>

        {/* Share Template Button */}
        <TouchableOpacity
          style={tw`rounded-lg bg-blue-700 p-4 items-center shadow-md mt-4`}
          onPress={handleShare}
        >
          <Text style={tw`text-white font-semibold text-lg`}>Share Template</Text>
        </TouchableOpacity>
      </View>
      <Canvas ref={canvasRef} style={tw`hidden`} />
    </ScrollView>
  );
};

export default TemplateDetailScreen;
