import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import YoutubeIframe from 'react-native-youtube-iframe';
import NavBar from '../../../components/NavBar';


const vlogs = [
  { id: 1, title: 'How to Improve Your Mental Health', videoId: '3QIfkeA6HBY' },
  { id: 2, title: 'My Journey with Anxiety and Depression', videoId: '859TCiFeKZ8' },
  { id: 3, title: 'Mental Health Tips and Tricks', videoId: 'NQcYZplTXnQ' },
  { id: 4, title: 'The Importance of Self-Care for Mental Health', videoId: 'UaMFf6Y4hHU' },
  { id: 5, title: 'How to Manage Stress and Anxiety', videoId: 'o18I23HCQtE' },
];

const audios = [
  { id: 4, title: 'Stress Relief', url: 'https://open.spotify.com/playlist/37i9dQZF1DWXe9gFZP0gtP?si=5ro37Cg4SPycNEZSn4gsIA&pi=a-sDRqY4hPR9-z' },
  { id: 5, title: 'Healing Rhythms', url: 'https://open.spotify.com/playlist/37i9dQZF1DX3SEFZskKvKB?si=sM3mnqH-Rfe4HAXnuXV-6w' },
  { id: 6, title: 'Yoga & Meditation', url: 'https://open.spotify.com/playlist/37i9dQZF1DX9uKNf5jGX6m?si=6qwtqd0nS8iJA_fFty3f7w&pi=a-Jh5Hs-hWSoe_' },
  { id: 7, title: 'Calming Nature Music', url: 'https://open.spotify.com/playlist/37i9dQZF1DX1KVBf2zZZ2X?si=SIbRCJZBSOer7UWPLjGMhg' },
  { id: 8, title: 'Peaceful Meditation', url: 'https://open.spotify.com/playlist/37i9dQZF1DWZqd5JICZI0u?si=YYX94oFNR9-pKGemk2M3ag&pi=a-ctoN5PneTiCk' },
];

const quotes = [
  { id: 1, text: '“Mental health is not a destination but a process.”' },
  { id: 2, text: '“Healing takes time, and asking for help is a courageous step.”' },
  { id: 3, text: '“It’s okay to not be okay.”' },
  { id: 4, text: '“Your mental health is a priority.”' },
  { id: 5, text: '“Take time to make your soul happy.”' },
];

const videos = [
  { id: 1, title: 'Tom Talk: About Mental Health & Overcoming Social Anxiety', videoId: 'GOqEl4ADyVk' },
  { id: 2, title: 'Mental Health Documentary: Mentality', videoId: 'Te8DnpcA4-A' },
];

const HealthSuggestions = () => {
  const [playing, setPlaying] = useState({});
  const navigation = useNavigation();

  const togglePlaying = (videoId) => {
    setPlaying((prevPlaying) => ({
      ...prevPlaying,
      [videoId]: !prevPlaying[videoId],
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#D16297', '#A38FC4', '#7EC8E3']} style={styles.gradient}>     
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" color="black" size={30} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Mental Health Suggestions</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ProfilePage')}>
          <Icon name="user" size={30} color="black" style={styles.profileIcon} />
        </TouchableOpacity>
      </View>

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {/* Vlogs Section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Vlogs</Text>
            {vlogs.map((vlog) => (
              <View key={vlog.id} style={styles.videoCard}>
                <YoutubeIframe
                  height={200}
                  play={playing[vlog.videoId]}
                  videoId={vlog.videoId}
                  onChangeState={(state) => state === 'ended' && setPlaying({ [vlog.videoId]: false })}
                />
                <TouchableOpacity onPress={() => togglePlaying(vlog.videoId)}>
                  <Text style={styles.cardTitle}>{vlog.title}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Quotes Section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Quotes</Text>
            {quotes.map((quote) => (
              <View key={quote.id} style={styles.quoteCard}>
                <Text style={styles.quoteText}>{quote.text}</Text>
              </View>
            ))}
          </View>

          {/* Videos Section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Videos</Text>
            {videos.map((video) => (
              <View key={video.id} style={styles.videoCard}>
                <YoutubeIframe
                  height={200}
                  play={playing[video.videoId]}
                  videoId={video.videoId}
                  onChangeState={(state) => state === 'ended' && setPlaying({ [video.videoId]: false })}
                />
                <TouchableOpacity onPress={() => togglePlaying(video.videoId)}>
                  <Text style={styles.cardTitle}>{video.title}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {/* Audios Section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Audios</Text>
            {audios.map((audio) => (
              <TouchableOpacity key={audio.id} style={styles.audioCard} onPress={() => Linking.openURL(audio.url)}>
                <Text style={styles.cardTitle}>{audio.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
          
        </ScrollView>

        {/* Fixed Navigation Bar */}
        <View style={styles.navbarContainer}>
          <NavBar />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 20, 
    backgroundColor: '#f49fb6',
    marginBottom: 20,
  },
  headerText: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: 'black' 
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  videoCard: {
    marginBottom: 20,
  },
  audioCard: {
    backgroundColor: '#f3e5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  quoteCard: {
    backgroundColor: '#fff3e0',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#333',
  },
  navbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default HealthSuggestions;