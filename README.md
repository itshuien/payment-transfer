# Payment Transfer

This is a React Native application built with [Expo](https://expo.dev) for managing payment transfers.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/itshuien/payment-transfer.git
   cd payment-transfer
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the app**:
   - Expo Go
      ```bash
      npx expo start
      ```
     - **Android**: Press `a` to open the app in an Android emulator.
     - **iOS**: Press `i` to open the app in an iOS simulator.
     - **Physical Device**: Scan the QR code in the Expo Go app (available on the App Store or Google Play).
   - Development build on physical device
     - **Android**:
       ```bash
       npx expo run:android --device
       ```
     - **iOS**:
       ```bash
       npx expo run:ios --device
       ```

## Demo

<table>
   <thead>
      <tr>
         <th>Scenario</th>
         <th>Screen recording</th>
      </tr>
   </thead>
   <tbody>
      <tr>
         <td>Transfer successful</td>
         <td>
            <video src="https://github.com/user-attachments/assets/db8186d9-b04e-4584-84f8-7efce7fc01bf" />
         </td>
      </tr>
      <tr>
         <td>Transfer failed</td>
         <td>
            <video src="https://github.com/user-attachments/assets/fbca14ad-1739-4e49-86cf-89b0d6664c5c" />
         </td>
      </tr>
      <tr>
         <td>Biometric authentication fallback</td>
         <td>
            <video src="https://github.com/user-attachments/assets/92c37fca-c2c6-4891-99d5-f7634bf1d465" />
         </td>
      </tr>
      <tr>
         <td>Repeat transfer</td>
         <td>
            <video src="https://github.com/user-attachments/assets/a898b7a7-517f-42fe-a377-afbc1b5a5c80" />
         </td>
      </tr>
   </tbody>
</table>

## Mock API

The app uses `msw` (Mock Service Worker) to simulate API calls. There is no real backend integration. The following endpoints are mocked:

| Method | Endpoint | Description |
|-|-|-|
| GET | /api/account-balance | Returns the current account balance |
| GET | /api/transfer-history | Returns a list of recent transactions |
| POST | /api/transfer | Submits a transfer request |

## Mock Data and Predefined Values

The app uses mock data and hardcoded values to simulate a real-world experience. Here's what to expect:

1. **Mock Data**:
   - **Account Balance**: Dynamically generated on every app start.
   - **Recent Transfer History**: A list of 5 recent transactions, re-generated on every app start.

2. **Hardcoded Values**:
   - **PIN Code**: The app uses a hardcoded PIN code `111111` for authentication purposes.
   - **Contacts**: A predefined list of contacts is hardcoded into the app for recipient selection.

## Testing Transfer Scenarios

You can simulate different outcomes for transfers by entering specific amounts:

| Amount | Simulated Outcome |
|-|-|
| 0.01 | Successful transfer |
| 0.02 | Invalid recipient |
| 0.03 | Insufficient balance |
| 0.04 | Server error |
| 0.05 | Network error |

These outcomes are configured in the mock API handlers. To test other scenarios, modify the `server.use` configuration located in [`useTransferMoney.ts`](src/api/useTransferMoney.ts).
