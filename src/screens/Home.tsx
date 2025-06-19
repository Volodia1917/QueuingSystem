import { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Modal,
    StatusBar,
    ActivityIndicator,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import styles from './Home.style';

interface Service {
    label: string;
    value: string;
}

interface ApiService {
    serviceCode: string;
    serviceName: string;
    description: string | null;
    isInOperation: boolean;
    createdDate: string | null;
}

interface CustomerInfo {
    fullName: string;
    phoneNumber: string;
    email: string;
}

interface TicketResponse {
    code: string;
    customerName: string;
    customerEmail: string;
    telephone: string;
    assignmentDate: string;
    expireDate: string;
    status: number;
    serviceCode: string;
    deviceCode: string;
    service: any;
    device: any;
    createdDate: string;
}

const API_BASE_URL = 'http://10.0.2.2:5000';

export default function Home() {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | null>(null);
    const [items, setItems] = useState<Service[]>([]);
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [ticketData, setTicketData] = useState<TicketResponse | null>(null);
    const [loadingServices, setLoadingServices] = useState(true);
    const [loadingTicket, setLoadingTicket] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Thông tin khách hàng
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
        fullName: '',
        phoneNumber: '',
        email: '',
    });

    // Validation state
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        fetchServices();
    }, []);
    const fetchServices = async () => {
        try {
            setLoadingServices(true);
            const response = await axios.get(`${API_BASE_URL}/api/Service/all`);
            const apiServices: ApiService[] = response.data;

            const formattedServices: Service[] = apiServices
                .filter(service => service.isInOperation === true)
                .map(service => ({
                    label: service.serviceName,
                    value: service.serviceCode,
                }));
            setItems(formattedServices);
            setError(null);
        } catch (err) {
            setError('Không thể lấy dữ liệu dịch vụ. Vui lòng thử lại sau.');
        } finally {
            setLoadingServices(false);
        }
    };
    const handleInputChange = (field: keyof CustomerInfo, value: string) => {
        setCustomerInfo(prev => ({
            ...prev,
            [field]: value,
        }));

        if (formErrors[field]) {
            setFormErrors(prev => ({
                ...prev,
                [field]: '',
            }));
        }
    };
    const validateForm = (): boolean => {
        const errors: { [key: string]: string } = {};

        if (!customerInfo.fullName.trim()) {
            errors.fullName = 'Vui lòng nhập họ tên';
        }

        if (!customerInfo.phoneNumber.trim()) {
            errors.phoneNumber = 'Vui lòng nhập số điện thoại';
        } else if (!/^[0-9]{10}$/.test(customerInfo.phoneNumber)) {
            errors.phoneNumber = 'Số điện thoại không hợp lệ';
        }

        const emailRegex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailTrimmed = customerInfo.email.trim();
        if (!emailTrimmed) {
            errors.email = 'Vui lòng nhập email';
        } else if (!emailRegex.test(emailTrimmed)) {
            errors.email = 'Email không hợp lệ';
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const generateTicket = async () => {
        if (!selectedService) return;
        if (!validateForm()) {
            return;
        }
        try {
            setLoadingTicket(true);

            const requestData = {
                customerName: customerInfo.fullName,
                customerEmail: customerInfo.email,
                telephone: customerInfo.phoneNumber,
                serviceCode: selectedService.value,
                deviceCode: 'KIO_2',
            };

            const response = await axios.post(
                `${API_BASE_URL}/api/Assignment/generate`,
                requestData,
                {
                    headers: {
                        accept: '*/*',
                        'Content-Type': 'application/json',
                    },
                },
            );
            // Store the complete ticket data
            const ticketResponse: TicketResponse = response.data;
            setTicketData(ticketResponse);
            setSelectedService(null);
            setValue(null);
            setCustomerInfo({
                fullName: '',
                phoneNumber: '',
                email: '',
            });
            setFormErrors({});

        } catch (error) {
            // Show error message to user
            if (axios.isAxiosError(error)) {
                setError(
                    `Lỗi tạo vé: ${error.response?.data?.message || error.message}`,
                );
            } else {
                setError('Có lỗi xảy ra khi tạo vé. Vui lòng thử lại.');
            }
        } finally {
            setLoadingTicket(false);
            setModalVisible(true);
        }
    };

    const handleSelectedService = (item: Service) => {
        setSelectedService(item);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const formatTime = (date: Date | null) => {
        if (!date) return '';
        return date.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatDate = (date: Date | null) => {
        if (!date) return '';
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    };

    return (<SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#FF7506" />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {loadingServices ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#FF7506" />
                    <Text style={styles.loadingText}>Đang tải dịch vụ...</Text>
                </View>
            ) : error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={fetchServices}>
                        <Text style={styles.retryButtonText}>Thử lại</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>CẤP SỐ MỚI</Text>

                    <View style={styles.serviceSection}>
                        <Text style={styles.serviceHeading}>
                            Dịch vụ khách hàng lựa chọn
                        </Text>

                        <View style={styles.dropdownContainer}>
                            <DropDownPicker
                                open={open}
                                value={value}
                                items={items}
                                setOpen={setOpen}
                                setValue={setValue}
                                setItems={setItems}
                                onSelectItem={item => handleSelectedService(item as Service)}
                                placeholder="Chọn dịch vụ"
                                style={styles.dropdown}
                                textStyle={styles.dropdownText}
                                dropDownContainerStyle={styles.dropdownListContainer}
                                placeholderStyle={styles.placeholderText}
                                ArrowDownIconComponent={() => (
                                    <View style={styles.arrowIcon}>
                                        <Text style={styles.arrowIconText}>▼</Text>
                                    </View>
                                )}
                                ArrowUpIconComponent={() => (
                                    <View style={styles.arrowIcon}>
                                        <Text style={styles.arrowIconText}>▲</Text>
                                    </View>
                                )}
                                TickIconComponent={() => (
                                    <View style={styles.checkmark}>
                                        <Text style={styles.checkmarkText}>✓</Text>
                                    </View>
                                )}
                                listMode="SCROLLVIEW"
                            />
                        </View>
                    </View>

                    {/* Form thông tin khách hàng */}
                    <View style={styles.formSection}>
                        <Text style={styles.formSectionHeading}>
                            Thông tin khách hàng
                        </Text>

                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>
                                Họ và tên <Text style={styles.requiredMark}>*</Text>
                            </Text>
                            <TextInput
                                style={[
                                    styles.formInput,
                                    formErrors.fullName ? styles.inputError : null,
                                ]}
                                value={customerInfo.fullName}
                                onChangeText={text => handleInputChange('fullName', text)}
                                placeholder="Nhập họ tên"
                                placeholderTextColor="#A9A9B0"
                            />
                            {formErrors.fullName ? (
                                <Text style={styles.errorMessage}>{formErrors.fullName}</Text>
                            ) : null}
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>
                                Số điện thoại <Text style={styles.requiredMark}>*</Text>
                            </Text>
                            <TextInput
                                style={[
                                    styles.formInput,
                                    formErrors.phoneNumber ? styles.inputError : null,
                                ]}
                                value={customerInfo.phoneNumber}
                                onChangeText={text => handleInputChange('phoneNumber', text)}
                                placeholder="Nhập số điện thoại"
                                placeholderTextColor="#A9A9B0"
                                keyboardType="phone-pad"
                                maxLength={10}
                            />
                            {formErrors.phoneNumber ? (
                                <Text style={styles.errorMessage}>
                                    {formErrors.phoneNumber}
                                </Text>
                            ) : null}
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.formLabel}>
                                Email <Text style={styles.requiredMark}>*</Text>
                            </Text>
                            <TextInput
                                style={[
                                    styles.formInput,
                                    formErrors.email ? styles.inputError : null,
                                ]}
                                value={customerInfo.email}
                                onChangeText={text => handleInputChange('email', text)}
                                placeholder="Nhập email"
                                placeholderTextColor="#A9A9B0"
                                keyboardType="email-address"
                            />
                            {formErrors.email ? (
                                <Text style={styles.errorMessage}>{formErrors.email}</Text>
                            ) : null}
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>

                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => {
                                setSelectedService(null);
                                setValue(null);
                                setCustomerInfo({
                                    fullName: '',
                                    phoneNumber: '',
                                    email: '',
                                });
                                setFormErrors({});
                                setTicketData(null);
                            }}>
                            <Text style={styles.cancelButtonText}>Hủy bỏ</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.actionButton,
                                (!selectedService || loadingTicket) && styles.disabledButton,
                            ]}
                            disabled={!selectedService || loadingTicket}
                            onPress={generateTicket}>
                            {loadingTicket ? (
                                <ActivityIndicator size="small" color="#FFFFFF" />
                            ) : (
                                <Text style={styles.actionButtonText}>In số</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </ScrollView>
        {/* Ticket Modal */}
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={closeModal}>
            <View style={styles.modalOverlay}>
                <View style={styles.ticketModal}>
                    <View style={styles.ticketHeader}>
                        <Text style={styles.ticketTitle}>Số thứ tự được cấp</Text>
                        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                            <Text style={styles.closeButtonText}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.ticketContent}>
                        <Text style={styles.ticketNumber}>{ticketData?.code}</Text>
                        <Text style={styles.ticketServiceText}>
                            DV: {ticketData
                                ? items.find(item => item.value === ticketData.serviceCode)?.label || ticketData.serviceCode
                                : ''}
                        </Text>
                        <View style={styles.ticketTimeInfo}>
                            <Text style={styles.timeInfoLabel}>
                                Thời gian cấp: {ticketData
                                    ? formatTime(new Date(ticketData.assignmentDate)) + ' ' + formatDate(new Date(ticketData.assignmentDate))
                                    : ''}
                            </Text>
                            <Text style={styles.timeInfoLabel}>
                                Hạn sử dụng: {ticketData
                                    ? formatTime(new Date(ticketData.expireDate)) + ' ' + formatDate(new Date(ticketData.expireDate))
                                    : ''}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    </SafeAreaView>
    );
}
