const { StyleSheet } = require('react-native');

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scrollContainer: {
    flexGrow: 1
  },


    serviceSection: {
        width: '100%',
    },
    serviceHeading: {
        fontSize: 18,
        fontWeight: '600',
        color: '#282739',
        marginBottom: 20,
        textAlign: 'center',
    },    card: {
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: "100%",
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#FF9138',
        marginBottom: 32,
        textAlign: 'center',
    },
    dropdownContainer: {
        marginBottom: 36,
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
    },
    dropdown: {
        borderColor: '#FF9138',
        borderRadius: 8,
        height: 48,
        borderWidth: 1.5,
        paddingHorizontal: 12,
        backgroundColor: '#FFF8F5',
    },
    dropdownText: {
        fontSize: 16,
        color: '#282739',
        fontWeight: '400',
    },
    dropdownListContainer: {
        borderColor: '#FF9138',
        borderWidth: 1,
        elevation: 4,
        shadowColor: '#FF9138',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        backgroundColor: '#FFFFFF',
    },
    placeholderText: {
        color: '#A9A9B0',
        fontSize: 16,
    },
    arrowIcon: {
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    arrowIconText: {
        color: '#FF9138',
        fontSize: 10,
    },
    checkmark: {
        width: 16,
        height: 16,
        borderRadius: 4,
        backgroundColor: '#FF9138',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkmarkText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: 'bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 32,
    },
    cancelButton: {
        paddingVertical: 14,
        paddingHorizontal: 36,
        borderWidth: 1.5,
        borderColor: '#FF9138',
        borderRadius: 8,
        marginRight: 24,
        alignItems: 'center',
        minWidth: 120,
    },
    cancelButtonText: {
        fontSize: 16,
        color: '#FF9138',
        fontWeight: '700',
    },
    actionButton: {
        backgroundColor: '#FF9138',
        paddingVertical: 14,
        paddingHorizontal: 36,
        borderRadius: 8,
        alignItems: 'center',
        minWidth: 120,
    },
    disabledButton: {
        backgroundColor: '#E0E0E0',
    },
    actionButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    ticketModal: {
        width: '90%',
        maxWidth: 400,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        overflow: 'hidden',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        alignItems: 'center',
    },
    ticketHeader: {
        width: '100%',
        paddingVertical: 16,
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    ticketTitle: {
        color: '#000000',
        fontSize: 22,
        fontWeight: 'bold',
    },
    ticketContent: {
        alignItems: 'center',
        width: '100%',
    },
    ticketNumber: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FF9138',
        marginBottom: 12,
    },
    ticketServiceText: {
        fontSize: 18,
        color: '#282739',
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: '600',
    },
    ticketTimeInfo: {
        width: '100%',
        backgroundColor: '#FF9138',
        padding: 24,
        alignItems: 'center',
        borderRadius: 8,
    },
    timeInfoLabel: {
        fontSize: 18,
        color: '#FFFFFF',
        marginBottom: 4,
        fontWeight: '500',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: '#FF9138',
        fontWeight: '500',
      },
      errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
      },
      errorText: {
        fontSize: 16,
        color: '#E73F3F',
        textAlign: 'center',
        marginBottom: 20,
      },
      retryButton: {
        backgroundColor: '#FF9138',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
      },
      retryButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
      },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    closeButtonText: {
        fontSize: 16,
        color: '#FF9138',
        fontWeight: '900',
    },
    formSection: {
        width: '100%',
        marginBottom: 32,
      },
      formSectionHeading: {
        fontSize: 18,
        fontWeight: '600',
        color: '#282739',
        marginBottom: 20,
        textAlign: 'center',
      },
      formGroup: {
        width: '100%',
        marginBottom: 16,
      },
      formLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#282739',
        marginBottom: 8,
      },
      requiredMark: {
        color: 'red',
      },
      formInput: {
        borderWidth: 1.5,
        borderColor: '#FF9138',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: '#282739',
        backgroundColor: '#FFF8F5',
      },
      formTextArea: {
        height: 80,
        textAlignVertical: 'top',
      },
      inputError: {
        borderColor: '#E73F3F',
      },
      errorMessage: {
        color: '#E73F3F',
        fontSize: 12,
        marginTop: 4,
      },
      helperText: {
        color: '#7E7D88',
        fontSize: 12,
        marginTop: 4,
        fontStyle: 'italic',
      },
      
      ticketCustomerInfo: {
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 12,
        paddingHorizontal: 16,
      },
      ticketCustomerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#282739',
        marginBottom: 4,
      },
      ticketCustomerDetail: {
        fontSize: 14,
        color: '#282739',
        marginBottom: 2,
      },
});

export default styles;