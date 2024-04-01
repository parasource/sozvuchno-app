import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function App() {
  return (
		<QueryClientProvider client={QueryClient}>
			<NavigationContainer>

			</NavigationContainer>
		</QueryClientProvider>
  );
}