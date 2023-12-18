import Icon from "../IconYaki";

const IconBody = `
  <path d="M6.00001 13.18V4C6.00001 3.73478 5.89465 3.48043 5.70711 3.29289C5.51958 3.10536 5.26522 3 5.00001 3C4.73479 3 4.48044 3.10536 4.2929 3.29289C4.10536 3.48043 4.00001 3.73478 4.00001 4V13.18C3.42085 13.3902 2.92047 13.7736 2.56685 14.2782C2.21323 14.7827 2.02353 15.3839 2.02353 16C2.02353 16.6161 2.21323 17.2173 2.56685 17.7218C2.92047 18.2264 3.42085 18.6098 4.00001 18.82V20C4.00001 20.2652 4.10536 20.5196 4.2929 20.7071C4.48044 20.8946 4.73479 21 5.00001 21C5.26522 21 5.51958 20.8946 5.70711 20.7071C5.89465 20.5196 6.00001 20.2652 6.00001 20V18.82C6.57916 18.6098 7.07955 18.2264 7.43316 17.7218C7.78678 17.2173 7.97648 16.6161 7.97648 16C7.97648 15.3839 7.78678 14.7827 7.43316 14.2782C7.07955 13.7736 6.57916 13.3902 6.00001 13.18ZM5.00001 17C4.80222 17 4.60888 16.9414 4.44444 16.8315C4.27999 16.7216 4.15181 16.5654 4.07613 16.3827C4.00044 16.2 3.98064 15.9989 4.01922 15.8049C4.05781 15.6109 4.15305 15.4327 4.2929 15.2929C4.43275 15.153 4.61093 15.0578 4.80492 15.0192C4.9989 14.9806 5.19996 15.0004 5.38269 15.0761C5.56542 15.1518 5.72159 15.28 5.83148 15.4444C5.94136 15.6089 6.00001 15.8022 6.00001 16C6.00001 16.2652 5.89465 16.5196 5.70711 16.7071C5.51958 16.8946 5.26522 17 5.00001 17ZM13 5.18V4C13 3.73478 12.8946 3.48043 12.7071 3.29289C12.5196 3.10536 12.2652 3 12 3C11.7348 3 11.4804 3.10536 11.2929 3.29289C11.1054 3.48043 11 3.73478 11 4V5.18C10.4209 5.3902 9.92047 5.77363 9.56685 6.27817C9.21323 6.7827 9.02353 7.38388 9.02353 8C9.02353 8.61612 9.21323 9.2173 9.56685 9.72184C9.92047 10.2264 10.4209 10.6098 11 10.82V20C11 20.2652 11.1054 20.5196 11.2929 20.7071C11.4804 20.8946 11.7348 21 12 21C12.2652 21 12.5196 20.8946 12.7071 20.7071C12.8946 20.5196 13 20.2652 13 20V10.82C13.5792 10.6098 14.0795 10.2264 14.4332 9.72184C14.7868 9.2173 14.9765 8.61612 14.9765 8C14.9765 7.38388 14.7868 6.7827 14.4332 6.27817C14.0795 5.77363 13.5792 5.3902 13 5.18ZM12 9C11.8022 9 11.6089 8.94135 11.4444 8.83147C11.28 8.72159 11.1518 8.56541 11.0761 8.38268C11.0004 8.19996 10.9806 7.99889 11.0192 7.80491C11.0578 7.61093 11.153 7.43275 11.2929 7.29289C11.4328 7.15304 11.6109 7.0578 11.8049 7.01921C11.9989 6.98063 12.2 7.00043 12.3827 7.07612C12.5654 7.15181 12.7216 7.27998 12.8315 7.44443C12.9414 7.60888 13 7.80222 13 8C13 8.26522 12.8946 8.51957 12.7071 8.70711C12.5196 8.89464 12.2652 9 12 9ZM22 13C22.0003 12.3793 21.8081 11.7739 21.4499 11.267C21.0917 10.7602 20.5852 10.3769 20 10.17C20.0048 10.1134 20.0048 10.0566 20 10V4C20 3.73478 19.8946 3.48043 19.7071 3.29289C19.5196 3.10536 19.2652 3 19 3C18.7348 3 18.4804 3.10536 18.2929 3.29289C18.1054 3.48043 18 3.73478 18 4V10C17.9952 10.0566 17.9952 10.1134 18 10.17C17.4175 10.3782 16.9135 10.7614 16.5572 11.2671C16.2009 11.7729 16.0096 12.3764 16.0096 12.995C16.0096 13.6136 16.2009 14.2171 16.5572 14.7229C16.9135 15.2286 17.4175 15.6118 18 15.82V20C18 20.2652 18.1054 20.5196 18.2929 20.7071C18.4804 20.8946 18.7348 21 19 21C19.2652 21 19.5196 20.8946 19.7071 20.7071C19.8946 20.5196 20 20.2652 20 20V15.82C20.5836 15.6137 21.089 15.2319 21.4471 14.7271C21.8051 14.2222 21.9983 13.6189 22 13ZM19 14C18.8022 14 18.6089 13.9414 18.4444 13.8315C18.28 13.7216 18.1518 13.5654 18.0761 13.3827C18.0004 13.2 17.9806 12.9989 18.0192 12.8049C18.0578 12.6109 18.153 12.4327 18.2929 12.2929C18.4328 12.153 18.6109 12.0578 18.8049 12.0192C18.9989 11.9806 19.2 12.0004 19.3827 12.0761C19.5654 12.1518 19.7216 12.28 19.8315 12.4444C19.9414 12.6089 20 12.8022 20 13C20 13.2652 19.8946 13.5196 19.7071 13.7071C19.5196 13.8946 19.2652 14 19 14Z" fill="#464646"/>
`;

export default Icon({
  iconStr: IconBody,
  viewBox: "0 0 24 24",
});