import pandas as pd

data = pd.read_csv("Divisions.csv")

data['DATE']  # as a Series
  # as a numpy array

result = data['DATE'].str.split(" ", n = 1, expand = True)
data['MDY'] = result[0]

new_df1 = data[(data['Unit Type']== "PzDiv")|(data['Unit Type']== "Mot Bde")|(data['Unit Type']== "Mot Rgt")|(data['Unit Type']== "Mot ID")].replace(' ', '_', regex=True)

new_df2 = data[(data['Unit Type'] == 'Inf Div')].replace(' ', '_', regex=True)

new_df1['SubType'] = new_df1['Unit Type']
new_df2['SubType'] = new_df2['Unit Type']

df1 = pd.concat([new_df1['MDY'],new_df1['SubType'],new_df1['POINT_X'],new_df1['POINT_Y']], axis=1)

df2 = pd.concat([new_df2['MDY'],new_df2['SubType'],new_df2['POINT_X'],new_df2['POINT_Y']], axis=1)

df = pd.concat([df1,df2],axis = 0)
export_csv = df.to_csv (r'NEWDATA.csv', index = None, header=True)

