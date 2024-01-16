import { StyleSheet } from 'react-native';

export const GlobalStyles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 12,
  },
  inputField: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 15,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  linkText: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 15,
  },
  title: {
    marginTop: 30,
    borderTopColor: 'black',
    borderTopWidth: 2,
    marginBottom: 15,
    width: '100%',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  }
});
