import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import {
  YStack,
  Text,
  Spinner,
  Button,
  Dialog,
  Adapt,
  Sheet,
  XStack,
  Input,
  Form,
  Label,
  H1,
} from 'tamagui';
import { TransactionContext } from '../../context/TransactionContext';
import { FontAwesome } from '@expo/vector-icons';

const CategoriesScreen = () => {
  const { categories, loading, addCategory, deleteCategory } = useContext(TransactionContext);
  const [newCategory, setNewCategory] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState('');

  const handleAddCategory = async () => {
    if (newCategory.trim() !== '') {
      await addCategory({ name: newCategory });
      setNewCategory('');
      setIsAddDialogOpen(false);
    }
  };

  const handleDeleteCategory = async () => {
    if (categoryToDelete) {
      await deleteCategory(categoryToDelete);
      setIsDeleteDialogOpen(false);
      setCategoryToDelete('');
    }
  };

  if (loading) {
    return (
      <YStack flex={1} justifyContent="center" alignItems="center">
        <Spinner size="large" color="$blue10" />
      </YStack>
    );
  }

  return (
    <ScrollView>
      <YStack p="$3" space="$3">
        <H1>Categories</H1>
        <Button icon={<FontAwesome name="plus" />} onPress={() => setIsAddDialogOpen(true)}>
          Add Category
        </Button>
        {categories.length > 0 ? (
          categories.map((category) => (
            <XStack
              key={category.id}
              justifyContent="space-between"
              alignItems="center"
              p="$3"
              bg="$background"
              borderRadius="$4"
              borderWidth={1}
              borderColor="$borderColor"
            >
              <Text>{category.name}</Text>
              <FontAwesome.Button
                name="trash"
                backgroundColor="transparent"
                underlayColor="transparent"
                color="red"
                onPress={() => {
                  setCategoryToDelete(category.name);
                  setIsDeleteDialogOpen(true);
                }}
              />
            </XStack>
          ))
        ) : (
          <Text>No categories yet.</Text>
        )}
      </YStack>

      {/* Add Category Dialog */}
      <Dialog modal open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <Adapt when="sm" platform="touch">
          <Sheet zIndex={200000} modal dismissOnSnapToBottom>
            <Sheet.Frame padding="$4" gap="$4">
              <Adapt.Contents />
            </Sheet.Frame>
            <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
          </Sheet>
        </Adapt>
        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            animation="quick"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Dialog.Content
            bordered
            elevate
            key="content"
            animateOnly={['transform', 'opacity']}
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            gap="$4"
          >
            <Dialog.Title>Add New Category</Dialog.Title>
            <Form>
              <YStack space="$2">
                <Label>Category Name</Label>
                <Input
                  placeholder="Enter category name"
                  value={newCategory}
                  onChangeText={setNewCategory}
                />
              </YStack>
            </Form>
            <XStack alignSelf="flex-end" gap="$4">
              <Button theme="alt1" onPress={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button theme="blue" onPress={handleAddCategory}>
                Add
              </Button>
            </XStack>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog modal open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <Adapt when="sm" platform="touch">
          <Sheet zIndex={200000} modal dismissOnSnapToBottom>
            <Sheet.Frame padding="$4" gap="$4">
              <Adapt.Contents />
            </Sheet.Frame>
            <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
          </Sheet>
        </Adapt>
        <Dialog.Portal>
          <Dialog.Overlay
            key="overlay"
            animation="quick"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Dialog.Content
            bordered
            elevate
            key="content"
            animateOnly={['transform', 'opacity']}
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            gap="$4"
          >
            <Dialog.Title>Confirm Deletion</Dialog.Title>
            <Dialog.Description>
              Are you sure you want to delete the category "{categoryToDelete}"?
            </Dialog.Description>
            <XStack alignSelf="flex-end" gap="$4">
              <Button theme="alt1" onPress={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button theme="red" onPress={handleDeleteCategory}>
                Delete
              </Button>
            </XStack>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </ScrollView>
  );
};

export default CategoriesScreen;